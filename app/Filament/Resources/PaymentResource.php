<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Filament\Resources\PaymentResource\RelationManagers;
use App\Models\Payment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Events';
    protected static bool $shouldRegisterNavigation = false;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\Select::make('event_id')
                    ->relationship('event', 'name')
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
                    ])->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('User'),
                TextColumn::make('event.name')->label('Event'),
                TextColumn::make('reference_number')->label('Reference Number'),
                TextColumn::make('amount')->label('Amount')->money('PHP'),
                ImageColumn::make('receipt_image')->label('Receipt')->size(100),
                BadgeColumn::make('status')->colors([
                    'primary' => 'pending',
                    'success' => 'successful',
                    'danger' => 'failed',
                ]),
                TextColumn::make('created_at')->label('Payment Date')->dateTime(),
            ])
            ->filters([
                // Add filters if necessary
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->action(function (Payment $record) {
                        $record->status = 'successful';
                        $record->save();

                        // Attach the user to the event if not already attached
                        if (!$record->event->users()->where('user_id', $record->user_id)->exists()) {
                            $record->event->users()->attach($record->user_id);
                        }
                    })
                    ->visible(fn (Payment $record) => $record->status === 'pending'),
                Tables\Actions\Action::make('disapprove')
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }   
}