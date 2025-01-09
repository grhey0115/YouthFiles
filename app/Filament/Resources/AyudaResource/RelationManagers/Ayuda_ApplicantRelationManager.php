<?php

namespace App\Filament\Resources\AyudaResource\RelationManagers;

use App\Models\AyudaApplicant;
use App\Models\User;
use App\Models\Ayuda;
use Filament\Resources\RelationManagers\RelationManager;
use App\Notifications\ApplicationStatusNotification;
use Filament\Forms;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Filament\Notifications\Notification;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Actions\Exports\Enums\ExportFormat;
use Illuminate\Support\Collection;
use pxlrbt\FilamentExcel\Exports\ExcelExport;
use pxlrbt\FilamentExcel\Columns\Column;
use Filament\Tables\Actions\ExportAction;
use App\Filament\Exports\AssistanceApplicantExporter;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\ExportBulkAction;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Tables\Actions\Action;
use Filament\Forms\Components\Select;
use Maatwebsite\Excel\Facades\Excel;



class Ayuda_ApplicantRelationManager extends RelationManager
{
    protected static string $relationship = 'applicants';
    protected static ?string $title = 'Applicants';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->label('Applicant Name')
                ->options(User::all()->pluck('name', 'id'))
                ->searchable()
                ->required(),
            Forms\Components\Select::make('status')
                ->options([
                    'pending' => 'Pending',
                    'approved' => 'Approved',
                    'disapproved' => 'Disapproved',
                ])
                ->required(),
            Forms\Components\DateTimePicker::make('notified_at')->label('Notified At'),
            Forms\Components\TextInput::make('aid_received')->label('Aid Received'),
            Forms\Components\TextInput::make('payment_method')->label('Payment Method'),
            Forms\Components\TextInput::make('payment_status')->label('Payment Status'),
            Forms\Components\TextInput::make('distribution_tracking')->label('Distribution Tracking'),
        ]);
    }

    public function table(Tables\Table $table): Tables\Table
{
    return $table->columns([
        Tables\Columns\TextColumn::make('user.full_name')
                ->label('Applicant Name')
                ->sortable()
                ->getStateUsing(fn($record) => $record->user->last_name . ' ' . $record->user->first_name. ' ' . $record->user->middle_name),
        Tables\Columns\TextColumn::make('status')->label('Status'),
        
    ])->filters([
        Tables\Filters\Filter::make('not_approved')
            ->query(fn (Builder $query): Builder => $query->where('status', '!=', 'approved'))
            ->default(true),
        ])
        ->actions([
            Tables\Actions\Action::make('approve')
                ->label('Approve')
                ->color('success')
                ->action(function (AyudaApplicant $record) {
                    // Update the applicant's status to 'approved'
                    $record->update(['status' => 'approved']);

                    // Fetch the related Ayuda
                    $ayuda = $record->ayuda;  // Access the ayuda related to the applicant

                    // Increment the current_beneficiaries count if there is still space
                    if ($ayuda->current_beneficiaries < $ayuda->max_beneficiaries) {
                        $ayuda->increment('current_beneficiaries');
                    }

                    $record->user->notify(new ApplicationStatusNotification('approved')); // Notify applicant
                }),

            Tables\Actions\Action::make('disapprove')
                ->label('Disapprove')
                ->color('danger')
                ->requiresConfirmation()
                ->action(function (AyudaApplicant $record, array $data) {
                    // If the applicant was previously approved, decrement the beneficiaries count
                    if ($record->status === 'approved') {
                        $record->ayuda->decrement('current_beneficiaries');
                    }
            
                    // Update the status to 'disapproved'
                    $record->update([
                        'status' => 'disapproved',
                        'reason' => $data['reason'],
                    ]);
            
                    // Notify the applicant
                    $record->user->notify(new ApplicationStatusNotification('disapproved', $data['reason']));
                })
                ->form([
                    Forms\Components\Textrea::make('reason')
                        ->label('Reason for Disapproval')
                        ->required()
                        ->placeholder('Please provide the reason for disapproval...'),
                ]),

            Tables\Actions\DeleteAction::make(),

            // Action for viewing uploaded files
            Tables\Actions\Action::make('viewFiles')
                ->label('View Uploaded Req')
                ->icon('heroicon-s-eye')
                ->color('secondary')
                ->modalHeading('Uploaded Files')
                ->modalWidth('xl')
                ->modalContent(function (AyudaApplicant $record) {
                    $files = $record->files()->with('requirement')->get();
                    return view('Filament.modals.view-files', compact('files'));
                }),

            // Action for viewing assistance history
            Tables\Actions\Action::make('viewHistory')
                ->label('View History')
                ->icon('heroicon-s-eye')
                ->color('secondary')
                ->modalHeading('Assistance History')
                ->modalWidth('xl')
                ->modalContent(function (AyudaApplicant $record) {
                    $history = \App\Models\AyudaApplicantHistory::where('user_id', $record->user_id)->get();
                    return view('Filament.modals.view-history', compact('history'));
                }),
        ])

        ->bulkActions([
            BulkActionGroup::make([
                
            ]),
        ])
        ->headerActions([
            Action::make('export')
            ->label('Export Applicants')
            ->form([
                Select::make('format')
                    ->label('Export Format')
                    ->options([
                        'csv' => 'CSV',
                        'excel' => 'Excel',
                        'pdf' => 'PDF',
                    ])
                    ->required(),
            ])
            ->action(function (array $data) {
                $ayuda = $this->ownerRecord;  // Get the current Ayuda (assistance) record
                
                // Filter out applicants who have status 'approved'
                $applicants = $ayuda->applicants()->where('status', '!=', 'approved')->get();  
                
                $format = $data['format'];
                $fileName = 'assistance-applicants-' . $ayuda->title . '.' . ($format === 'excel' ? 'xlsx' : $format);

                if ($format === 'pdf') {
                    // Generate PDF
                    $pdf = Pdf::loadView('pdf.assistance-applicants', [
                        'applicants' => $applicants,
                        'ayuda' => $ayuda, // Pass the ayuda record for context
                    ])->setPaper('a4', 'landscape');

                    // Return the PDF file for download (will trigger Save As prompt)
                    return response()->streamDownload(
                        fn () => print($pdf->output()),
                        $fileName
                    );
                } elseif ($format === 'excel') {
                    // Generate Excel and prompt Save As
                    return Excel::download(new AssistanceApplicantExporter($applicants), $fileName);
                } elseif ($format === 'csv') {
                    // Generate CSV and prompt Save As
                    return Excel::download(new AssistanceApplicantExporter($applicants), $fileName, \Maatwebsite\Excel\Excel::CSV);
                }
            })
            ->modalHeading('Export Assistance Applicants')
            ->modalButton('Export'),
    ]);
           
       
}
   
    // Modal action for viewing uploaded files
    public function openFilesModal($recordId): void
    {
        $files = AyudaApplicant::find($recordId)->files;
        $this->dispatchBrowserEvent('open-files-modal', ['files' => $files]);
    }

    // Modal action for viewing assistance history
    public function openHistoryModal($recordId): void
    {
        $history = AyudaApplicant::find($recordId)->history;
        $this->dispatchBrowserEvent('open-history-modal', ['history' => $history]);
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
  
    public static function getEloquentQuery(): Builder
    {
        return AyudaApplicant::query()->with(['user', 'requirements']);
    }
}
