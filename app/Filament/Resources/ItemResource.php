<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ItemResource\Pages;
use App\Filament\Resources\ItemResource\RelationManagers;
use App\Models\Item;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ItemResource extends Resource
{
    protected static ?string $model = Item::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                            
                        Forms\Components\Select::make('category')
                            ->required()
                            ->options([
                                'equipment' => 'Equipment',
                                'facility' => 'Facility',
                                'sports' => 'Sports Equipment',
                                'electronics' => 'Electronics',
                                'furniture' => 'Furniture',
                            ]),
                            
                            Forms\Components\TextInput::make('quantity')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->reactive()
                            ->afterStateUpdated(function ($set, $state) {
                                // Automatically update availability when quantity changes
                                $set('is_available', $state > 0);
                            }),
                            
                            Forms\Components\TextInput::make('available_quantity')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(fn ($get) => $get('quantity'))
                            ->reactive(),
                            
                        Forms\Components\Toggle::make('is_available')
                            ->label('Available for borrowing')
                            ->disabled(fn ($get) => $get('quantity') <= 0)
                            ->helperText('Can only be enabled if quantity is greater than 0'),
                        ]),
                            
                        Forms\Components\Textarea::make('description')
                            ->rows(3),
                            
                        Forms\Components\Select::make('condition')
                            ->options([
                                'new' => 'New',
                                'good' => 'Good',
                                'fair' => 'Fair',
                                'needs_repair' => 'Needs Repair'
                            ]),
                        ]);
                        
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->sortable(),
                Tables\Columns\TextColumn::make('quantity')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_available')
                    ->boolean(),
                Tables\Columns\TextColumn::make('condition'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category'),
                Tables\Filters\TernaryFilter::make('is_available'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
    
 

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListItems::route('/'),
            'create' => Pages\CreateItem::route('/create'),
            'view' => Pages\ViewItem::route('/{record}'),
            'edit' => Pages\EditItem::route('/{record}/edit'),
        ];
    }
}
