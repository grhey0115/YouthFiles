<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Icetalker\FilamentTableRepeater\Forms\Components\TableRepeater;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Filament\Exports\ProcurementExport;

class PurchaseRequestRelationManager extends RelationManager
{
    protected static string $relationship = 'procurements'; // Ensure this relationship exists in the Project model
    protected static ?string $recordTitleAttribute = 'pr_no';
    protected static ?string $title = 'Purchase Requests';

   

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

        Forms\Components\Textarea::make('purpose')
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

                Forms\Components\TextInput::make('request_by')  
                    ->required()  
                    ->label('Requested by:'),  
                Forms\Components\TextInput::make('requestor_designation')  
                    ->required()  
                    ->label('Designation:'),  
                Forms\Components\TextInput::make('approve_by')  
                    ->required()  
                    ->label('Approved by:'),  
                Forms\Components\TextInput::make('approver_designation')  
                    ->required()  
                    ->label('Designation:'),  
            
        Forms\Components\Textarea::make('remarks')
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
                $quantity = (float)($state ?: 0);
                $unitCost = (float)($get('unit_cost') ?: 0);
                $set('total_cost', $quantity * $unitCost);

                // Recalculate total procurement cost safely
                $set('procurement_cost', collect($get('procurement_items') ?? [])
                    ->sum(fn($item) => ((float)($item['quantity'] ?? 0)) * ((float)($item['unit_cost'] ?? 0))));
            })
            ->label('Quantity'),
        Forms\Components\TextInput::make('unit_cost')
            ->required()
            ->numeric()
            ->reactive() // Trigger recalculation when unit cost changes
            ->afterStateUpdated(function ($set, $state, $get) {
                $unitCost = (float)($state ?: 0);
                $quantity = (float)($get('quantity') ?: 0);
                $set('total_cost', $quantity * $unitCost);

                // Recalculate total procurement cost safely
                $set('procurement_cost', collect($get('procurement_items') ?? [])
                    ->sum(fn($item) => ((float)($item['quantity'] ?? 0)) * ((float)($item['unit_cost'] ?? 0))));
            })
            ->label('Unit Cost'),
        Forms\Components\TextInput::make('total_cost')
            ->numeric()
            ->dehydrated(true)
            ->label('Total Cost'),
    ])
    ->columns(5)
    ->reactive() // Ensure the repeater is reactive
    ->afterStateUpdated(function ($set, $state) {
        // Recalculate total procurement cost safely
        $set('procurement_cost', collect($state)->sum(fn($item) => ((float)($item['quantity'] ?? 0)) * ((float)($item['unit_cost'] ?? 0))));
    }),

Forms\Components\TextInput::make('procurement_cost')
    ->numeric()
    ->dehydrated(true)
    ->label('Total Procurement Cost')
    ->default(0)
    ->reactive() // Ensure it updates when form state changes
    ->afterStateUpdated(function ($set, $get) {
        // Recalculate total procurement cost when any procurement item changes
        $set('procurement_cost', collect($get('procurement_items') ?? [])
            ->sum(fn($item) => ((float)($item['quantity'] ?? 0)) * ((float)($item['unit_cost'] ?? 0))));
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
                    ->label('Status')
                    ->colors([
                        'danger' => 'rejected',
                        'warning' => 'draft',
                        'info' => 'pending',
                        'success' => 'approved',
                    ]),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('approval_status')
                ->label('Status')
                ->options([
                    'draft' => 'Draft',
                    'pending' => 'Pending',
                    'rejected' => 'Rejected',
                ])
                ->default(['draft', 'pending', 'rejected'])
                ->query(function (Builder $query, array $data) {
                    return $query->when(
                        $data['values'],
                        fn (Builder $query) => $query->whereIn('approval_status', $data['values'])
                    );
                })
                ->multiple()
        ])
        ->persistFiltersInSession() 
            
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([  
                Tables\Actions\EditAction::make()
                    ->color('warning'), // Yellow for edit  
                
                    
                
                // New Export Action
                Tables\Actions\Action::make('export')
                    ->label('Export')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('info')
                    ->form([
                        Forms\Components\Select::make('format')
                            ->label('Choose Export Format')
                            ->options([
                                'csv' => 'CSV',
                                'excel' => 'Excel',
                                'pdf' => 'PDF',
                            ])
                            ->required(),
                    ])
                    ->action(function (\App\Models\Procurement $record, array $data) {
                        $format = $data['format'];
                        $fileName = 'procurement-' . $record->pr_no . '.' . ($format === 'excel' ? 'xlsx' : $format);
    
                        // Prepare the procurement data with its items
                        $procurementData = collect([$record]);
    
                        // PDF Export
                        if ($format === 'pdf') {
                            $pdf = PDF::loadView('pdf.single-procurement', [
                                'procurement' => $record,
                            ])->setPaper('a4', 'portrait');
    
                            return response()->streamDownload(
                                fn () => print($pdf->output()),
                                $fileName
                            );
                        } 
                        // Excel/CSV Export
                        else {
                            $export = new ProcurementExport($procurementData);
    
                            if ($format === 'excel') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                            } elseif ($format === 'csv') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                            }
                        }
                    }),
    
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->hidden(fn (\App\Models\Procurement $record) => $record->approval_status === 'draft')
                    ->action(fn (\App\Models\Procurement $record) => $record->update(['approval_status' => 'approved'])),
                
                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->hidden(fn (\App\Models\Procurement $record) => $record->approval_status === 'draft')
                    ->action(fn (\App\Models\Procurement $record) => $record->update(['approval_status' => 'rejected'])),
                
                Tables\Actions\DeleteAction::make()
                    ->color('danger'),
            ]);
        }
            
    

    public function approved(): Builder  
    {  
       return $this->procurements()->where('approval_status', 'approved');  
    }  
}
