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
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkAction;
use App\Filament\Exports\BudgetFinancialReportExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Str;

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
                    Tables\Actions\Action::make('single_export')
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
                    ->action(function (Budget $record, array $data) {
                        $format = $data['format'];
                        $fileName = 'budget-' . $record->budget_id . '.' . ($format === 'excel' ? 'xlsx' : $format);
                
                        // Prepare the budget data with its projects and disbursements
                        $budgetData = collect([$record->loadMissing(['projects.disbursements'])]);
                
                        // PDF Export
                        if ($format === 'pdf') {
                            $pdf = PDF::loadView('pdf.single-budget', [
                                'budget' => $record,
                                'projects' => $record->projects,
                                'totalProjects' => $record->projects->count(),
                                'totalAllocated' => $record->projects->sum('total_budget'),
                                'totalDisbursed' => $record->projects->flatMap->disbursements->sum('disbursed_amount'),
                                'remainingBalance' => $record->total_amount - $record->projects->flatMap->disbursements->sum('disbursed_amount'),
                            ])->setPaper('a4', 'portrait');
                
                            return response()->streamDownload(
                                fn () => print($pdf->output()),
                                $fileName
                            );
                        } 
                        // Excel/CSV Export
                        else {
                            $export = new BudgetExport($budgetData);
                
                            if ($format === 'excel') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                            } elseif ($format === 'csv') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                            }
                        }
                    }),
                 ])
        
            
            ->headerActions([
                Tables\Actions\Action::make('export')
                    ->icon('heroicon-s-arrow-down-tray')
                    ->label('Export Financial Report')
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
                    ->action(function (array $data) {
                        $format = $data['format'];
                        $fileName = 'financial-report.' . ($format === 'excel' ? 'xlsx' : $format);

                        // Fetch and format data for export
                        $budgets = Budget::with(['projects.disbursements'])->get()->map(function ($budget) {
                            $totalAllocatedToProjects = $budget->projects->sum('total_budget');
                            $totalDisbursed = $budget->projects->flatMap->disbursements->sum('disbursed_amount');

                            return [
                                'Budget ID' => $budget->budget_id,
                                'Budget Name' => $budget->name,
                                'Total Budget' => $budget->total_amount,
                                'Total Allocated to Projects' => $totalAllocatedToProjects,
                                'Total Disbursed' => $totalDisbursed,
                                'Remaining Balance' => $budget->total_amount - $totalDisbursed,
                            ];
                        });

                        if ($format === 'pdf') {
                            $pdf = Pdf::loadView('pdf.financial-report', ['budgets' => $budgets])->setPaper('a4', 'landscape');

                            return response()->streamDownload(
                                fn () => print($pdf->output()),
                                $fileName
                            );
                        } else {
                            $export = new BudgetFinancialReportExport($budgets);

                            if ($format === 'excel') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                            } elseif ($format === 'csv') {
                                return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                            }
                        }
                    })
                    ->modalHeading('Export Financial Report')
                    ->modalButton('Download')
            ])
            
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
                BulkAction::make('bulkExport')
                ->label('Export Selected')
                ->icon('heroicon-s-arrow-down-tray')
                ->form([
                    Select::make('format')
                        ->label('Choose Export Format')
                        ->options([
                            'csv' => 'CSV',
                            'excel' => 'Excel',
                            'pdf' => 'PDF',
                        ])
                        ->required(),
                ])
                ->action(function (Collection $records, array $data) {
                    $format = $data['format'];
                    $fileName = 'financial-report.' . ($format === 'excel' ? 'xlsx' : $format);

                    // Fetch and format data for export
                    $budgets = $records->map(function ($budget) {
                        $totalAllocatedToProjects = $budget->projects->sum('total_budget');
                        $totalDisbursed = $budget->projects->flatMap->disbursements->sum('disbursed_amount');

                        return [
                            'Budget ID' => $budget->budget_id,
                            'Budget Name' => $budget->name,
                            'Total Budget' => $budget->total_amount,
                            'Total Allocated to Projects' => $totalAllocatedToProjects,
                            'Total Disbursed' => $totalDisbursed,
                            'Remaining Balance' => $budget->total_amount - $totalDisbursed,
                        ];
                    });

                    if ($format === 'pdf') {
                        $pdf = Pdf::loadView('pdf.financial-report', ['budgets' => $budgets])->setPaper('a4', 'landscape');

                        return response()->streamDownload(
                            fn () => print($pdf->output()),
                            $fileName
                        );
                    } else {
                        $export = new BudgetFinancialReportExport($budgets);

                        if ($format === 'excel') {
                            return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                        } elseif ($format === 'csv') {
                            return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                        }
                    }
                }),
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
