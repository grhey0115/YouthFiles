<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TanodRequestsResource\Pages;
use App\Models\TanodRequests;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;
use App\Notifications\TanodRequestStatusNotification;
use App\Notifications\TanodRequestReminderNotification;

class TanodRequestsResource extends Resource
{
    protected static ?string $model = TanodRequests::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';
    protected static ?string $navigationGroup = 'Community Services';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable(),

                        Forms\Components\TextInput::make('contact')
                            ->required()
                            ->label('Contact Number'),

                        Forms\Components\Textarea::make('details')
                            ->required()
                            ->label('Request Details')
                            ->maxLength(500),

                        Forms\Components\TextInput::make('place')
                            ->required()
                            ->label('Place of Request'),

                        Forms\Components\FileUpload::make('request_letter')
                            ->required()
                            ->label('Request Letter')
                            ->acceptedFileTypes(['application/pdf', 'image/jpeg', 'image/png'])
                            ->disk('public')
                            ->directory('tanod_requests'),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'in_progress' => 'In Progress',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                                'completed' => 'Completed'
                            ])
                            ->required(),

                        Forms\Components\Textarea::make('admin_remarks')
                            ->maxLength(500)
                            ->label('Admin Remarks'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('contact')
                    ->label('Contact Number'),

                Tables\Columns\TextColumn::make('place')
                    ->label('Place of Request'),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'in_progress',
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'primary' => 'completed',
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'in_progress' => 'In Progress',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                        'completed' => 'Completed'
                    ]),
            ])
            ->actions([
                // Approve Action
                Tables\Actions\Action::make('approve')
                    ->action(function (TanodRequests $record) {
                        $record->update([
                            'status' => 'approved',
                            'approved_at' => now(),
                        ]);

                        // Notify the user
                        $record->user->notify(new TanodRequestStatusNotification('approved'));

                        Notification::make()
                            ->title('Tanod Request Approved')
                            ->success()
                            ->body("The Tanod request has been approved.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (TanodRequests $record) => $record->status === 'pending'),

                // Reject Action
                Tables\Actions\Action::make('reject')
                    ->action(function (TanodRequests $record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'admin_remarks' => $data['remarks'] ?? null,
                        ]);

                        // Notify the user
                        $record->user->notify(new TanodRequestStatusNotification('rejected', $data['remarks']));

                        Notification::make()
                            ->title('Tanod Request Rejected')
                            ->danger()
                            ->body("The Tanod request has been rejected.")
                            ->send();
                    })
                    ->form([
                        Forms\Components\Textarea::make('remarks')
                            ->label('Rejection Reason')
                            ->required(),
                    ])
                    ->requiresConfirmation()
                    ->visible(fn (TanodRequests $record) => $record->status === 'pending'),

                // Mark as In Progress Action
                Tables\Actions\Action::make('mark_in_progress')
                    ->action(function (TanodRequests $record) {
                        $record->update([
                            'status' => 'in_progress',
                            'in_progress_at' => now(),
                        ]);

                        // Notify the user
                        $record->user->notify(new TanodRequestStatusNotification('in_progress'));

                        Notification::make()
                            ->title('Tanod Request In Progress')
                            ->info()
                            ->body("The Tanod request is now in progress.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (TanodRequests $record) => $record->status === 'approved'),

                // Mark as Completed Action
                Tables\Actions\Action::make('mark_completed')
                    ->action(function (TanodRequests $record) {
                        $record->update([
                            'status' => 'completed',
                            'completed_at' => now(),
                        ]);

                        // Notify the user
                        $record->user->notify(new TanodRequestStatusNotification('completed'));

                        Notification::make()
                            ->title('Tanod Request Completed')
                            ->success()
                            ->body("The Tanod request has been completed.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (TanodRequests $record) => $record->status === 'in_progress'),

                // Remind Action
                Tables\Actions\Action::make('remind')
                    ->action(function (TanodRequests $record) {
                        $title = "Tanod Request Reminder";
                        $message = "This is a reminder about your Tanod service request.";
                        
                        // Notify the user
                        $record->user->notify(new TanodRequestReminderNotification($title, $message));

                        Notification::make()
                            ->title('Reminder Sent')
                            ->success()
                            ->body("A reminder has been sent to {$record->user->name}.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (TanodRequests $record) => in_array($record->status, ['approved', 'in_progress'])),


                    Tables\Actions\Action::make('viewFiles')
                        ->label('View Uploaded Req')
                        ->icon('heroicon-s-eye')
                        ->color('secondary')
                        ->modalHeading('Uploaded Files')
                        ->modalWidth('xl')
                        ->modalContent(function (TanodRequests $record) {
                            $files = collect();
                            if ($record->request_letter) {
                                $files->push((object)[
                                    'file_path' => $record->request_letter,
                                    'requirement' => (object)[
                                        'requirement_name' => 'Request Letter'
                                    ]
                                ]);
                            }

                            return view('Filament.modals.tanod-files', compact('files'));
                        }),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTanodRequests::route('/'),
            'create' => Pages\CreateTanodRequests::route('/create'),
            'view' => Pages\ViewTanodRequests::route('/{record}'),
            'edit' => Pages\EditTanodRequests::route('/{record}/edit'),
        ];
    }
}