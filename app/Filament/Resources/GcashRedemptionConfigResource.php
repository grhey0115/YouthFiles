<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GcashRedemptionConfigResource\Pages;
use App\Filament\Resources\GcashRedemptionConfigResource\RelationManagers;
use App\Models\GcashRedemptionConfig;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class GcashRedemptionConfigResource extends Resource
{
    protected static ?string $model = GcashRedemptionConfig::class;
    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationGroup = 'Rewards Management';
    protected static ?string $navigationLabel = 'GCash Redemption Configs';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Redemption Configuration')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('points_required')
                            ->label('Points Required')
                            ->numeric()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->rules(['min:100']),

                        Forms\Components\TextInput::make('gcash_amount')
                            ->label('GCash Amount (₱)')
                            ->numeric()
                            ->required()
                            ->prefix('₱')
                            ->rules(['min:10']),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),

                        Forms\Components\TextInput::make('maximum_redemptions_per_month')
                            ->label('Max Monthly Redemptions')
                            ->numeric()
                            ->nullable()
                            ->helperText('Optional: Limit redemptions per month')
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('points_required')
                    ->label('Points')
                    ->sortable(),

                Tables\Columns\TextColumn::make('gcash_amount')
                    ->label('GCash Amount')
                    ->money('PHP')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),

                Tables\Columns\TextColumn::make('maximum_redemptions_per_month')
                    ->label('Max Monthly Redemptions')
                    ->default('Unlimited')
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status')
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGcashRedemptionConfigs::route('/'),
            'create' => Pages\CreateGcashRedemptionConfig::route('/create'),
            'view' => Pages\ViewGcashRedemptionConfig::route('/{record}'),
            'edit' => Pages\EditGcashRedemptionConfig::route('/{record}/edit'),
        ];
    }
}
