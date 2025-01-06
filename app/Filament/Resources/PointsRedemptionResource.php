<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PointsRedemptionResource\Pages;
use App\Models\PointsRedemption;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PointsRedemptionResource extends Resource
{
    protected static ?string $model = PointsRedemption::class;
    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationGroup = 'Rewards Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Redemption Details')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'full_name')
                            ->searchable()
                            ->required(),

                        Forms\Components\Select::make('points_redeemed')
                            ->options(PointsRedemption::getConversionRates())
                            ->required(),

                        Forms\Components\TextInput::make('gcash_name')
                            ->label('GCash Name')
                            ->required(),

                        Forms\Components\TextInput::make('gcash_number')
                            ->label('GCash Number')
                            ->required(),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'completed' => 'Completed',
                                'failed' => 'Failed',
                                'cancelled' => 'Cancelled'
                            ])
                            ->default('pending')
                            ->required(),

                        Forms\Components\TextInput::make('gcash_amount')
                            ->label('GCash Amount')
                            ->prefix('₱')
                            ->numeric()
                            ->required(),

                        Forms\Components\TextInput::make('transaction_reference')
                            ->label('Transaction Reference')
                            ->disabled()
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.full_name')
                    ->label('User')
                    ->searchable(),

                Tables\Columns\TextColumn::make('points_redeemed')
                    ->label('Points')
                    ->sortable(),

                Tables\Columns\TextColumn::make('gcash_amount')
                    ->label('Amount')
                    ->money('PHP')
                    ->sortable(),

                Tables\Columns\TextColumn::make('gcash_number')
                    ->label('GCash Number')
                    ->searchable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'processing',
                        'success' => 'completed',
                        'danger' => ['failed', 'cancelled']
                    ])
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                        'cancelled' => 'Cancelled'
                    ])
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('process')
                    ->label('Process')
                    ->color('success')
                    ->action(function (PointsRedemption $record) {
                        $record->update([
                            'status' => 'completed',
                            'remarks' => 'Redemption processed on ' . now()
                        ]);
                    })
                    ->visible(fn ($record) => $record->status === 'pending')
            ]);
    }
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPointsRedemptions::route('/'),
            'view' => Pages\ViewPointsRedemption::route('/{record}'),
            'edit' => Pages\EditPointsRedemption::route('/{record}/edit'),
        ];
    }
}
