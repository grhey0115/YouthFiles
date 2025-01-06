<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmergencyRequestResource\Pages;
use App\Models\EmergencyRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class EmergencyRequestResource extends Resource
{
    protected static ?string $model = EmergencyRequest::class;
    protected static ?string $navigationIcon = 'heroicon-o-exclamation-triangle';
    protected static ?string $navigationGroup = 'Community Services';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Request Details')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->required(),

                        Forms\Components\TextInput::make('contact_number')
                            ->required()
                            ->tel()
                            ->label('Contact Number'),

                        Forms\Components\Select::make('assistance_type')
                            ->options([
                                'health' => 'Health Assistance',
                                'financial' => 'Financial Support',
                                'education' => 'Educational Aid',
                                'community' => 'Community Safety',
                                'personal' => 'Personal Crisis'
                            ])
                            ->required(),

                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),

                        Forms\Components\FileUpload::make('supporting_document')
                            ->label('Supporting Document')
                            ->acceptedFileTypes(['application/pdf', 'image/jpeg', 'image/png', 'image/gif'])
                            ->disk('public')
                            ->directory('emergency_requests'),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'in_progress' => 'In Progress',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                                'completed' => 'Completed'
                            ])
                            ->default('pending')
                            ->required(),

                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Admin Remarks')
                            ->columnSpanFull(),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user')
                    ->label('Full Name')
                    ->searchable()
                    ->sortable()
                    ->getStateUsing(function ($record) {
                        return trim("{$record->user->first_name} {$record->user->middle_name} {$record->user->last_name}");
                    }),

                Tables\Columns\TextColumn::make('contact_number')
                    ->label('Contact'),

                Tables\Columns\TextColumn::make('assistance_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'health' => 'info',
                        'financial' => 'warning',
                        'education' => 'success',
                        'community' => 'primary',
                        'personal' => 'danger'
                    }),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'in_progress',
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'primary' => 'completed',
                    ]),

               
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
                Tables\Filters\SelectFilter::make('assistance_type')
                    ->options([
                        'health' => 'Health Assistance',
                        'financial' => 'Financial Support',
                        'education' => 'Educational Aid',
                        'community' => 'Community Safety',
                        'personal' => 'Personal Crisis'
                    ])
            ])
            ->actions([
                // View Uploaded Files Action
                Tables\Actions\Action::make('viewFiles')
                    ->label('Uploaded Doc')
                    ->icon('heroicon-s-eye')
                    ->color('secondary')
                    ->modalHeading('Uploaded Supporting Documents')
                    ->modalWidth('xl')
                    ->modalContent(function (EmergencyRequest $record) {
                        $files = collect();
                        if ($record->supporting_document) {
                            $files->push((object)[
                                'file_path' => $record->supporting_document,
                                'requirement' => (object)[
                                    'requirement_name' => 'Supporting Document'
                                ]
                            ]);
                        }

                        return view('Filament.modals.emergency-files', compact('files'));
                    }),

                // Approve Action
                Tables\Actions\Action::make('approve')
                    ->action(function (EmergencyRequest $record) {
                        $record->update([
                            'status' => 'approved',
                            'admin_notes' => 'Request has been approved and is being processed.',
                            'approved_at' => now()
                        ]);

                        Notification::make()
                            ->title('Emergency Request Approved')
                            ->success()
                            ->body("The emergency request has been approved.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EmergencyRequest $record) => $record->status === 'pending'),

                // Reject Action
                Tables\Actions\Action::make('reject')
                    ->color('danger')
                    ->action(function (EmergencyRequest $record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'admin_notes' => $data['reason'] ?? 'Request rejected without specific reason.',
                            'rejected_at' => now()
                        ]);

                        Notification::make()
                            ->title('Emergency Request Rejected')
                            ->danger()
                            ->body("The emergency request has been rejected.")
                            ->send();
                    })
                    ->form([
                        Forms\Components\Textarea::make('reason')
                            ->label('Rejection Reason')
                            ->required(),
                    ])
                    ->requiresConfirmation()
                    ->visible(fn (EmergencyRequest $record) => $record->status === 'pending'),

                // Mark as In Progress Action
                Tables\Actions\Action::make('mark_in_progress')
                    ->action(function (EmergencyRequest $record) {
                        $record->update([
                            'status' => 'in_progress',
                            'admin_notes' => 'Request is currently being processed.',
                            'in_progress_at' => now()
                        ]);

                        Notification::make()
                            ->title('Emergency Request In Progress')
                            ->info()
                            ->body("The emergency request is now in progress.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EmergencyRequest $record) => $record->status === 'approved'),

                // Mark as Completed Action
                Tables\Actions\Action::make('mark_completed')
                    ->action(function (EmergencyRequest $record) {
                        $record->update([
                            'status' => 'completed',
                            'admin_notes' => 'Request has been successfully resolved.',
                            'completed_at' => now()
                        ]);

                        Notification::make()
                            ->title('Emergency Request Completed')
                            ->success()
                            ->body("The emergency request has been completed.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EmergencyRequest $record) => $record->status === 'in_progress'),

                // Remind Action
                Tables\Actions\Action::make('remind')
                    ->action(function (EmergencyRequest $record) {
                        // Implement your reminder logic here
                        // This could be sending an SMS, email, or system notification
                        Notification::make()
                            ->title('Reminder Sent')
                            ->success()
                            ->body("A reminder has been sent for this emergency request.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EmergencyRequest $record) => in_array($record->status, ['approved', 'in_progress'])),

                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    // Bulk Status Update
                    Tables\Actions\BulkAction::make('update_status')
                        ->label('Update Status')
                        ->action(function (Collection $records, array $data) {
                            $records->each(function ($record) use ($data) {
                                $record->update([
                                    'status' => $data['status'],
                                    'admin_notes' => $data['notes'] ?? null
                                ]);
                            });

                            Notification::make()
                                ->title('Bulk Status Update')
                                ->success()
                                ->body('Selected requests have been updated.')
                                ->send();
                        })
                        ->form([
                            Forms\Components\Select::make('status')
                                ->options([
                                    'pending' => 'Pending',
                                    'in_progress' => 'In Progress',
                                    'approved' => 'Approved',
                                    'rejected' => 'Rejected',
                                    'completed' => 'Completed'
                                ])
                                ->required(),
                            Forms\Components\Textarea::make('notes')
                                ->label('Admin Notes')
                                ->nullable()
                        ])
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEmergencyRequests::route('/'),
            'create' => Pages\CreateEmergencyRequest::route('/create'),
            'edit' => Pages\EditEmergencyRequest::route('/{record}/edit'),
        ];
    }
}