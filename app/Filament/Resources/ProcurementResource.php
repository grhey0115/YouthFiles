<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProcurementResource\Pages;
use App\Filament\Resources\ProcurementResource\RelationManagers;
use App\Models\Procurement;
use App\Models\Project;
use App\Models\User;
use App\Models\ProcurementItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Actions\ExportAction;
use App\Filament\Exports\YouthExporter;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\ExportBulkAction;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Actions\Exports\Enums\ExportFormat;
use Illuminate\Support\Collection;
use Icetalker\FilamentTableRepeater\Forms\Components\TableRepeater;


class ProcurementResource extends Resource
{
    protected static ?string $model = Procurement::class;

    protected static ?string $navigationIcon = 'heroicon-o-numbered-list';
    protected static ?string $navigationGroup = 'Project Expenditure';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            Forms\Components\TextInput::make('pr_no')
            ->required()
            ->label('PR No.'),
            Forms\Components\Select::make('project_id')
                ->relationship('project', 'name')
                ->required()
                ->reactive() // Trigger update when a project is selected
                ->afterStateUpdated(function ($set, $state) {
                    if ($state) {
                        // Fetch the selected project
                        $project = \App\Models\Project::find($state);

                        // Fetch the remaining budget using the attribute defined in the model
                        $remaining_allotment = $project->remaining_budget;

                        // Set the allotment available field with the calculated remaining budget
                        $set('allotment_available', $remaining_allotment);
                    }
                })
                ->label('Project'),

              

            

            Forms\Components\DatePicker::make('procurement_date')
                ->required()
                ->label('Procurement Date'),

            Forms\Components\TextArea::make('purpose')
                ->required()
                ->label('Purpose or Justification'),

            Forms\Components\Select::make('approval_status')
                ->options([
                    'draft' => 'Draft',
                    'pending' => 'Pending',
                    'approved' => 'Approved',
                    'rejected' => 'Rejected',
                ])
                ->label('Approval Status')
                ->default('draft'),

          

                Forms\Components\Select::make('procurement_officer')
                ->relationship('user', 'first_name')
                ->getOptionLabelUsing(fn ($user) => "{$user->first_name} {$user->last_name}")
                ->label('Procurement Officer'),
              
                
            Forms\Components\TextArea::make('remarks')
                ->label('Remarks'),

            /*    Forms\Components\TextInput::make('allotment_available')
                ->label('Allotment Available')
                ->numeric()
                ->disabled() // This field should only display the value, not editable by users
                ->default(0),*/
                
                TableRepeater::make('procurement_items')
    ->relationship('procurementItems') // Ensure this relationship exists
    ->label('Items')
    ->schema([
        Forms\Components\TextInput::make('description')
            ->required()
            ->label('Item'),
        
        Forms\Components\TextInput::make('unit')
            ->required()
            ->label('Unit'),

            Forms\Components\TextInput::make('quantity')
            ->required()
            ->numeric()
            ->reactive() // Trigger recalculation when quantity changes
            ->afterStateUpdated(function ($set, $state, $get) {
                // Calculate total cost when quantity is updated
                $set('total_cost', $state * $get('unit_cost'));
        
                // Recalculate total procurement cost safely (ensure procurement_items is not null)
                $set('procurement_cost', collect($get('procurement_items') ?? [])
                    ->sum(fn($item) => $item['quantity'] * $item['unit_cost']));
            })
            ->label('Quantity'),

            Forms\Components\TextInput::make('unit_cost')
            ->required()
            ->numeric()
            ->reactive() // Trigger recalculation when unit cost changes
            ->afterStateUpdated(function ($set, $state, $get) {
                // Calculate total cost when unit cost is updated
                $set('total_cost', $state * $get('quantity'));
        
                // Recalculate total procurement cost safely (ensure procurement_items is not null)
                $set('procurement_cost', collect($get('procurement_items') ?? [])
                    ->sum(fn($item) => $item['quantity'] * $item['unit_cost']));
            })
            ->label('Unit Cost'),
        Forms\Components\TextInput::make('total_cost')
            ->numeric()
            ->dehydrated(true)
           // ->disabled() // Make it non-editable, it's calculated automatically
            ->label('Total Cost'),
    ])
    ->columnSpan('full')
    ->reorderable()
    ->cloneable()
    ->columns(5)
    ->reactive() // Ensure the repeater is reactive
    ->afterStateUpdated(function ($set, $state) {
        // Recalculate total procurement cost whenever procurement items are updated
        $set('procurement_cost', collect($state)->sum(fn($item) => $item['quantity'] * $item['unit_cost']));
    }),

    Forms\Components\TextInput::make('procurement_cost')
    ->numeric()
// ->disabled()
 ->dehydrated(true)
    ->label('Total Procurement Cost')
    ->default(0)
    ->reactive() // Ensure it updates when form state changes
    ->afterStateUpdated(function ($set, $get) {
        // Recalculate total procurement cost when any procurement item changes
        $set('procurement_cost', $get('procurement_items')
            ->sum(fn($item) => $item['quantity'] * $item['unit_cost'])
        );
    }),
    
        ]);

        
}
    public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('pr_no')->label('Pr No.'),
            Tables\Columns\TextColumn::make('project.name')->label('Project'),
            Tables\Columns\TextColumn::make('procurement_cost')->label('Cost')->money('PHP', true),
            Tables\Columns\TextColumn::make('project.budget.name')->label('Budget'), // Access the budget through project
            Tables\Columns\TextColumn::make('procurement_date')->label('Date')->date(),
        ])
        ->defaultSort('created_at', 'desc')
        ->filters([
            // Add any filters here if needed
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListProcurements::route('/'),
            'create' => Pages\CreateProcurement::route('/create'),
            'edit' => Pages\EditProcurement::route('/{record}/edit'),
        ];
    }
}
