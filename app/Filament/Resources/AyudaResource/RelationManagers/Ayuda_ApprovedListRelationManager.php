<?php

namespace App\Filament\Resources\AyudaResource\RelationManagers;

use App\Models\AyudaApplicant;
use Illuminate\Support\Str;
use App\Models\Ayuda;
use App\Models\AyudaApplicantHistory;
use App\Models\User;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Forms;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Exports\ApprovedApplicantsExporter;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\ExportBulkAction;
use Illuminate\Support\Collection;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Tables\Actions\Action;
use Filament\Forms\Components\Select;
use Maatwebsite\Excel\Facades\Excel;



class Ayuda_ApprovedListRelationManager extends RelationManager
{
    protected static string $relationship = 'applicants';
    protected static ?string $title = 'Approved Applicants';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('full_name')
                    ->label('Full Name')
                    ->disabled()
                    ->default(fn($record) => $record ? $record->user->first_name . ' ' . $record->user->last_name : ''),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'disapproved' => 'Disapproved',
                    ])
                    ->required(),

                Forms\Components\DateTimePicker::make('applied_at')
                    ->label('Applied At')
                    ->disabled(),

                Forms\Components\Select::make('payment_method')
                    ->label('Payment Method')
                    ->options([
                        'bank_transfer' => 'Bank Transfer',
                        'cash' => 'Cash',
                        'check' => 'Check',
                        'mobile_payment' => 'Mobile Payment',
                    ])
                    ->required(),

                Forms\Components\Select::make('payment_status')
                    ->label('Payment Status')
                    ->options([
                        'unpaid' => 'Unpaid',
                        'paid' => 'Paid',
                        'pending' => 'Pending',
                        'failed' => 'Failed',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('aid_received')
                    ->label('Aid Received')
                    ->numeric(),

                Forms\Components\Select::make('assistance_received')
                    ->label('Assistance Received?')
                    ->options([
                        'pending' => 'Pending',
                        'received' => 'Received',
                        'not_received' => 'Not Received',
                    ]),
            ]);
    }

    public function table(Tables\Table $table): Tables\Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('user.full_name')
                ->label('Applicant Name')
                ->sortable()
                ->getStateUsing(fn($record) => $record->user->last_name . ' ' . $record->user->first_name. ' ' . $record->user->middle_name),

            Tables\Columns\BadgeColumn::make('payment_status')
                ->label('Payment Status')
                ->colors([
                    'primary' => 'pending',
                    'success' => 'paid',
                    'danger' => 'failed',
                ])
                ->sortable(),

            Tables\Columns\IconColumn::make('payment_method')
                ->label('Payment Method')
                ->options([
                    'credit-card' => 'Credit Card',
                    'bank' => 'Bank Transfer',
                    'cash' => 'Cash',
                ])
                ->colors([
                    'primary' => 'Credit Card',
                    'success' => 'Bank Transfer',
                    'warning' => 'Cash',
                ]),

            Tables\Columns\TextColumn::make('aid_received')
                ->label('Aid Received')
                ->sortable(),

            Tables\Columns\BadgeColumn::make('assistance_received')
                ->label('Assistance Received')
                ->colors([
                    'success' => 'received',
                    'secondary' => 'pending',
                ])
                ->sortable(),
        ])
        ->filters([
            Tables\Filters\Filter::make('approved')
                ->query(fn (Builder $query): Builder => $query->where('status', 'approved'))
                ->default(true),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),

            Tables\Actions\ButtonAction::make('markAsReceived')
                ->label('Mark as Received')
                ->color('success')
                ->icon('heroicon-s-check')
                ->action(function (AyudaApplicant $record) {
                    // Update the assistance status to 'received'
                    $record->update(['assistance_received' => 'received']);

                    // Ensure the ayuda relationship is available
                    if ($record->ayuda) {
                        // Log the assistance details into history
                        AyudaApplicantHistory::create([
                            'ayuda_applicant_id' => $record->id,        // Ayuda Applicant ID
                            'ayuda_title' => $record->ayuda->title,     // Ayuda title from the related Ayuda model
                            'user_id' => $record->user_id,              // User ID of the applicant
                            'status' => 'received',                     // Set status to 'received'
                            'aid_received' => $record->aid_received,    // Aid received amount
                            'payment_method' => $record->payment_method, // Payment method
                            'payment_status' => $record->payment_status, // Payment status
                            'received_at' => now(),                     // Time aid was marked as received
                            'remarks' => 'Assistance marked as received.',
                            'recorded_by' => auth()->id(),              // Admin who recorded this
                        ]);
                    } else {
                        // Handle the case where ayuda relationship is missing
                        throw new \Exception('Ayuda record is not available for this applicant.');
                    }
                })
                ->visible(fn (AyudaApplicant $record) => $record->assistance_received !== 'received')
        ])
        ->headerActions([
            Action::make('export')
            ->label('Export Approved Applicants')
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
                
                // Fetch only approved applicants
                $approvedApplicants = $ayuda->applicants()->where('status', 'approved')->get();  
                
                $format = $data['format'];
                $fileName = 'approved-applicants-' . Str::slug($ayuda->title, '-') . '.' . ($format === 'excel' ? 'xlsx' : $format);

                if ($format === 'pdf') {
                    // Generate PDF
                    $pdf = Pdf::loadView('pdf.approved-applicants', [
                        'applicants' => $approvedApplicants,
                        'ayuda' => $ayuda, // Pass the ayuda record for context
                    ])->setPaper('a4', 'landscape');

                    // Return the PDF file for download (will trigger Save As prompt)
                    return response()->streamDownload(
                        fn () => print($pdf->output()),
                        $fileName
                    );
                } elseif ($format === 'excel') {
                    // Generate Excel and prompt Save As
                    return Excel::download(new ApprovedApplicantsExporter($approvedApplicants), $fileName);
                } elseif ($format === 'csv') {
                    // Generate CSV and prompt Save As
                    return Excel::download(new ApprovedApplicantsExporter($approvedApplicants), $fileName, \Maatwebsite\Excel\Excel::CSV);
                }
            })
            ->modalHeading('Export Approved Applicants')
            ->modalButton('Export'),
   
        ])
        ->bulkActions([
           
        ]);
}
public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'approved')->count();
    }


}
