<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Filament\Resources\ProjectResource\RelationManagers\ProcurementRelationManager;
use App\Filament\Resources\ProjectResource\RelationManagers\DisbursementRelationManager;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'Project Expenditure';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            // Add project ID input
            Forms\Components\TextInput::make('project_id')
                ->label('Project ID')
                ->required()
                ->unique(table: Project::class, column: 'project_id'), // Ensure project_id is unique
            
            // Add budget ID input
            Forms\Components\Select::make('budget_id')
                ->label('Budget')
                ->relationship('budget', 'name')  // Link to budget via its name
                ->required(),
            
            // Other fields...
            Forms\Components\FileUpload::make('header_image')
                ->label('Header Image')
                ->image()
                ->directory('project-headers')
                ->nullable(),

            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),

            Forms\Components\Textarea::make('description')
                ->nullable(),

            Forms\Components\DatePicker::make('start_date')
                ->required(),

            Forms\Components\DatePicker::make('end_date')
                ->required(),

            Forms\Components\TextInput::make('total_budget')
                ->numeric()
                ->prefix('₱')
                ->required(),
          
        ]);
}

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('project_id')
                ->sortable(),

            Tables\Columns\TextColumn::make('name')
                ->sortable(),

            Tables\Columns\TextColumn::make('description')
                ->limit(50),
            
            Tables\Columns\TextColumn::make('total_budget')
            ->money('PHP', true)
            ->sortable(),

           Tables\Columns\TextColumn::make('remaining_budget')
            ->money('PHP', true)
            ->limit(50)
            ->color(function ($state, $record) {
                $totalBudget = $record->total_budget; // Assuming 'total_budget' is a field in the same table
                $percentage = ($totalBudget > 0) ? ($state / $totalBudget) * 100 : 0;

                if ($percentage > 50) {
                    return 'success'; // Green
                } elseif ($percentage > 20) {
                    return 'warning'; // Orange
                } else {
                    return 'danger';  // Red
                }
            }),

            Tables\Columns\TextColumn::make('start_date')
                ->date()
                ->sortable(),

            Tables\Columns\TextColumn::make('end_date')
                ->date()
                ->sortable(),

           

            Tables\Columns\TextColumn::make('procurements_count')
                ->counts('procurements')
                ->label('Total Procurements'),

            Tables\Columns\TextColumn::make('disbursements_count')
                ->counts('disbursements')
                ->label('Total Disbursements'),
        ])
        ->defaultSort('created_at', 'desc')
        ->actions([
            Tables\Actions\EditAction::make(),
        ])
        ->bulkActions([
            Tables\Actions\DeleteBulkAction::make(),
        ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\ProcurementRelationManager::class,
            RelationManagers\DisbursementRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
