<?php

namespace App\Filament\Resources\EventResource\RelationManagers;

use App\Models\Payment;
use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;
use Illuminate\Database\Eloquent\Model;
use Filament\Tables\Actions\Action;
use Filament\Notifications\Notification;

class PaymentsRelationManager extends RelationManager
{
    protected static string $relationship = 'payments';
    protected static ?string $recordTitleAttribute = 'reference_number';

    public function can(string $action, ?Model $record = null): bool
    {
        if ($record instanceof \App\Models\Event && $record->registration_fee == 0) {
            return false; // Hide the relation manager if registration fee is 0
        }

        return parent::can($action, $record);
    }

    public function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('User'),
                TextColumn::make('reference_number')->label('Reference Number'),
                TextColumn::make('amount')->label('Amount')->money('PHP'),
                ImageColumn::make('receipt_image')->label('Receipt')->size(100), // Display as an image
                BadgeColumn::make('status')->label('Status')->colors([
                    'primary' => 'pending',
                    'success' => 'successful',
                    'danger' => 'failed',
                ]),
                TextColumn::make('created_at')->label('Payment Date')->dateTime(),
            ])
            ->actions([
                Action::make('view-receipt')
                    ->label('View Receipt')
                    ->icon('heroicon-o-eye')
                    ->color('secondary')
                    ->modalHeading('Receipt')
                    ->modalWidth('xl')
                    ->modalContent(function (Payment $record) {
                        return view('Filament.modals.view-receipt', ['payment' => $record]);
                    }),
                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->action(function (Payment $record) {
                        $record->status = 'successful';
                        $record->save();
                    })
                    ->visible(fn (Payment $record) => $record->status === 'pending'),

                Action::make('disapprove')
                    ->label('Disapprove')
                    ->icon('heroicon-o-x-circle')
                    ->action(function (Payment $record) {
                        $record->status = 'failed';
                        $record->save();
                    })
                    ->visible(fn (Payment $record) => $record->status === 'pending'),

                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\TextInput::make('reference_number')
                    ->label('Reference Number')
                    ->required(),
                Forms\Components\TextInput::make('amount')
                    ->label('Amount')
                    ->required()->numeric(),
                Forms\Components\FileUpload::make('receipt_image')
                    ->label('Receipt Image')
                    ->image(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'successful' => 'Successful',
                        'failed' => 'Failed',
                    ])
                    ->required(),
            ]);
    }
}
