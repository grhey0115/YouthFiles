<?php

namespace App\Filament\Resources\AyudaResource\RelationManagers;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\RelationManagers\RelationManager;

class DonationsRelationManager extends RelationManager
{
    protected static string $relationship = 'userDonations'; // Change to userDonations

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('donation_id')
                    ->relationship('donation', 'title')
                    ->required(),
                Forms\Components\TextInput::make('amount')
                    ->numeric()
                    ->required()
                    ->visible(fn ($get) => $get('donation.donation_type') === 'money'),
                Forms\Components\TextInput::make('quantity')
                    ->numeric()
                    ->required()
                    ->visible(fn ($get) => in_array($get('donation.donation_type'), ['item', 'service'])),
                Forms\Components\TextInput::make('estimated_value')
                    ->numeric()
                    ->nullable(),
                Forms\Components\TextInput::make('reference_number')
                    ->nullable(),
                Forms\Components\FileUpload::make('receipt')
                    ->nullable(),
                Forms\Components\Textarea::make('description')
                    ->nullable(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->required(),
            ]);
    }

    public function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('donation.title')
                    ->label('Donation'),
                Tables\Columns\TextColumn::make('amount')
                    ->money()
                    ->label('Amount'),
                Tables\Columns\TextColumn::make('quantity')
                    ->label('Quantity'),
                Tables\Columns\TextColumn::make('reference_number')
                    ->label('Reference'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default => 'warning',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}