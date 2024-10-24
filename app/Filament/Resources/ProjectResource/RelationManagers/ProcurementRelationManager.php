<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Icetalker\FilamentTableRepeater\Forms\Components\TableRepeater;

class ProcurementRelationManager extends RelationManager
{
    protected static string $relationship = 'procurements'; // Ensure this relationship exists in the Project model
    protected static ?string $recordTitleAttribute = 'pr_no';

   

    public  function form(Forms\Form $form): Forms\Form
{
    return $form
    ->schema([
        Forms\Components\TextInput::make('pr_no')
        ->required()
        ->label('PR No.'),
        Forms\Components\Select::make('project_id')
            ->relationship('project', 'name')
            ->required()
            ->default(fn (RelationManager $livewire) => $livewire->ownerRecord->id)
        
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
            ->label('Project')
            ->disabled(),

          

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
    public  function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('pr_no')
                    ->label('Procurement No.')
                    ->sortable(),
                Tables\Columns\TextColumn::make('procurement_cost')
                    ->money('PHP', true)
                    ->label('Total Cost'),
                Tables\Columns\TextColumn::make('procurement_date')
                    ->date()
                    ->label('Procurement Date')
                    ->sortable(),
                Tables\Columns\TextColumn::make('approval_status')
                    ->badge()
                    ->label('Status'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
