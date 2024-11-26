<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BorrowRequestsResource\Pages;
use App\Models\BorrowRequests;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Notifications\BorrowRequestStatusNotification;
use App\Notifications\BorrowRequestReminderNotification;

class BorrowRequestsResource extends Resource
{
    protected static ?string $model = BorrowRequests::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

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

                        Forms\Components\Select::make('item_id')
                            ->relationship('item', 'name')
                            ->required()
                            ->searchable(),

                        Forms\Components\Textarea::make('purpose')
                            ->required()
                            ->label('Purpose of Borrowing')
                            ->maxLength(500),

                        Forms\Components\DatePicker::make('borrow_date')
                            ->required()
                            ->label('Borrow Date')
                            ->minDate(now()),

                        Forms\Components\DatePicker::make('return_date')
                            ->required()
                            ->label('Return Date')
                            ->after('borrow_date'),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'in_progress' => 'In Progress',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                                'returned' => 'Returned'
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
                Tables\Columns\TextColumn::make('user')
                    ->label('Full Name')
                    ->searchable()
                    ->sortable()
                    ->getStateUsing(function ($record) {
                        return trim("{$record->user->first_name} {$record->user->middle_name} {$record->user->last_name}");
                    }),

                Tables\Columns\TextColumn::make('item.name')
                    ->label('Item Name'),

                Tables\Columns\TextColumn::make('purpose')
                    ->label('Purpose of Borrowing'),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'in_progress',
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'primary' => 'returned',
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
                        'returned' => 'Returned'
                    ]),
            ])
            ->actions([
                // Approve Action
                Tables\Actions\Action::make('approve')
                    ->action(function (BorrowRequests $record) {
                        $record->update([
                            'status' => 'approved',
                            'approved_at' => now(),
                        ]);

                        // Notify the user
                        $record->user->notify(new BorrowRequestStatusNotification('approved'));

                        Notification::make()
                            ->title('Borrow Request Approved')
                            ->success()
                            ->body("The borrow request has been approved.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (BorrowRequests $record) => $record->status === 'pending'),

                // Reject Action
                Tables\Actions\Action::make('reject')
                    ->action(function (BorrowRequests $record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'admin_remarks' => $data['remarks'] ?? null,
                        ]);

                        // Notify the user
                        $record->user->notify(new BorrowRequestStatusNotification('rejected', $data['remarks']));

                        Notification::make()
                            ->title('Borrow Request Rejected')
                            ->danger()
                            ->body("The borrow request has been rejected.")
                            ->send();
                    })
                    ->form([
                        Forms\Components\Textarea::make('remarks')
                            ->label('Rejection Reason')
                            ->required(),
                    ])
                    ->requiresConfirmation()
                    ->visible(fn (BorrowRequests $record) => $record->status === 'pending'),


                // Mark as Returned Action
                Tables\Actions\Action::make('mark_returned')
                    ->action(function (BorrowRequests $record) {
                        $record->update([
                            'status' => 'returned',
                            'returned_at' => now(),
                        ]);

                        // Notify the user
                        $record->user->notify(new BorrowRequestStatusNotification('returned'));

                        Notification::make()
                            ->title('Borrow Request Returned')
                            ->success()
                            ->body("The borrow request has been marked as returned.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (BorrowRequests $record) => $record->status === 'approved'),

                // Remind Action
                Tables\Actions\Action::make('remind')
                    ->action(function (BorrowRequests $record) {
                        $title = "Borrow Request Reminder";
                        $message = "This is a reminder about your borrow request.";
                        
                        // Notify the user
                        $record->user->notify(new BorrowRequestReminderNotification($title, $message));

                        Notification::make()
                            ->title('Reminder Sent')
                            ->success()
                            ->body("A reminder has been sent to {$record->user->name}.")
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->visible(fn (BorrowRequests $record) => in_array($record->status, ['approved', 'in_progress'])),

                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBorrowRequests::route('/'),
            'create' => Pages\CreateBorrowRequests::route('/create'),
            'view' => Pages\ViewBorrowRequests::route('/{record}'),
            'edit' => Pages\EditBorrowRequests::route('/{record}/edit'),
        ];
    }
}