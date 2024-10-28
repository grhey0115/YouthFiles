<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BudgetResource\Pages;
use App\Models\Budget;
use App\Models\Disbursement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

class BudgetResource extends Resource
{
    protected static ?string $model = Budget::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationLabel = 'Local Budget';
    protected static ?string $navigationGroup = 'Project Expenditure';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('budget_id')
                    ->label('Budget ID')
                    ->required()
                    ->regex('/^[A-Za-z0-9]+$/')
                    ->unique(Budget::class, 'budget_id', ignoreRecord: true), // Ignore the current record when editing
                  
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
    
                Forms\Components\Textarea::make('description')
                    ->nullable(),
    
                TextInput::make('total_amount')
                    ->numeric()
                    ->prefix('₱')
                    ->required(),
    
                Forms\Components\DatePicker::make('start_date')
                    ->required(),
    
                Forms\Components\DatePicker::make('end_date')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('budget_id')
                ->label('Budget ID')
                ->sortable(),

                TextColumn::make('name')->sortable(),

                // Display total amount as PHP currency
                TextColumn::make('total_amount')
                    ->label('Total Amount')
                    ->money('PHP', true)
                    ->sortable(),

                // Display dynamically calculated remaining amount as PHP currency
                TextColumn::make('remaining_amount')
                    ->label('Remaining Amount')
                    ->money('PHP', true)
                   
                    ->sortable(),

                TextColumn::make('start_date')->date()->sortable(),
                TextColumn::make('end_date')->date()->sortable(),
                TextColumn::make('user.name')->label('Created By'),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListBudgets::route('/'),
            'create' => Pages\CreateBudget::route('/create'),
            'edit' => Pages\EditBudget::route('/{record}/edit'),
        ];
    }
}
