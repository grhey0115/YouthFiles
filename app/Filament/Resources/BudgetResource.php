<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BudgetResource\Pages;
use App\Models\Budget;
use App\Models\User;
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
use Filament\Forms\Components\Placeholder;
use Carbon\Carbon;

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
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Budget Details')
                            ->schema([
                                TextInput::make('budget_id')
                                    ->label('Budget ID')
                                    ->required()
                                    ->unique(Budget::class, 'budget_id', ignoreRecord: true)
                                    ->placeholder('BUDGET-' . now()->format('YmdHis'))
                                    ->helperText('A unique identifier for the budget. Will be auto-generated if left blank.')
                                    ->prefix('BUDGET-')
                                    ->autofocus(),
    
                                TextInput::make('name')
                                    ->label('Budget Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter budget name')
                                    ->rules(['min:3']),
    
                                Forms\Components\Textarea::make('description')
                                    ->label('Budget Description')
                                    ->nullable()
                                    ->rows(3)
                                    ->placeholder('Provide a brief description of the budget purpose')
                                    ->maxLength(500),
                            ])
                            ->columns(2),
    
                        Forms\Components\Section::make('Financial Information')
                            ->schema([
                                TextInput::make('total_amount')
                        ->label('Total Budget Amount')
                        ->required()
                        ->numeric()
                        ->prefix('₱')
                        ->minValue(0)
                        ->step(0.01)
                        ->placeholder('0.00')
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (Forms\Set $set, $state, Forms\Get $get) {
                            $contingencyPercentage = $get('contingency_percentage') ?? 5;
                            $contingencyAmount = $state * ($contingencyPercentage / 100);
                            $set('contingency_amount', number_format($contingencyAmount, 2, '.', ''));
                        }),

                   
                ])
                            ->columns(2),
                            Forms\Components\Section::make('Budget Timeline')
                            ->schema([
                                Forms\Components\DatePicker::make('start_date')
                                    ->label('Budget Start Date')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('M d, Y')
                                    ->closeOnDateSelection()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (Forms\Set $set, $state, Forms\Get $get) {
                                        $endDate = $get('end_date');
                                        if ($state && $endDate) {
                                            $duration = Carbon::parse($state)->diffInDays(Carbon::parse($endDate));
                                            $set('duration', $duration . ' days');
                                        }
                                    }),
                        
                                Forms\Components\DatePicker::make('end_date')
                                    ->label('Budget End Date')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('M d, Y')
                                    ->closeOnDateSelection()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (Forms\Set $set, $state, Forms\Get $get) {
                                        $startDate = $get('start_date');
                                        if ($startDate && $state) {
                                            $duration = Carbon::parse($startDate)->diffInDays(Carbon::parse($state));
                                            $set('duration', $duration . ' days');
                                        }
                                    }),
                        
                                Forms\Components\TextInput::make('duration')
                                    ->label('Budget Duration')
                                    ->disabled()
                                    ->dehydrated(false),
                            ])
                            ->columns(3),
                    ])
                    ->columnSpan(['lg' => 2]),
    
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Budget Allocation Tracking')
                            ->schema([
                                Forms\Components\Placeholder::make('total_allocated')
                                    ->label('Total Allocated')
                                    ->content(function ($record) {
                                        return $record 
                                            ? '₱ ' . number_format($record->projects->sum('total_budget'), 2)
                                            : '₱ 0.00';
                                    }),
    
                                Forms\Components\Placeholder::make('total_disbursed')
                                    ->label('Total Disbursed')
                                    ->content(function ($record) {
                                        return $record 
                                            ? '₱ ' . number_format($record->projects->flatMap->disbursements->sum('disbursed_amount'), 2)
                                            : '₱ 0.00';
                                    }),
    
                                Forms\Components\Placeholder::make('remaining_balance')
                                    ->label('Remaining Balance')
                                    ->content(function ($record) {
                                        if (!$record) return '₱ 0.00';
                                        
                                        $totalBudget = $record->total_amount;
                                        $totalDisbursed = $record->projects->flatMap->disbursements->sum('disbursed_amount');
                                        $remainingBalance = $totalBudget - $totalDisbursed;
                                        
                                        return '₱ ' . number_format($remainingBalance, 2);
                                    })
                                    
                            ])
                            ->columns(1),
    
                        Forms\Components\Section::make('Additional Information')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->label('Budget Status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'active' => 'Active',
                                        'completed' => 'Completed',
                                        'on_hold' => 'On Hold',
                                    ])
                                    ->default('draft')
                                    ->required(),
    
                                Forms\Components\Select::make('funding_source')
                                    ->label('Funding Source')
                                    ->options([
                                        'internal' => 'Internal Funds',
                                        'grant' => 'Grant',
                                        'donation' => 'Donation',
                                        'government' => 'Government Allocation',
                                        'other' => 'Other',
                                    ])
                                    ->required(),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('budget_id')
                    ->label('Budget ID')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('primary'),
    
                Tables\Columns\TextColumn::make('name')
                    ->label('Budget Name')
                    ->searchable()
                    ->sortable()
                    ->wrap(),
    
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Total Budget')
                    ->money('PHP')
                    ->color('success')
                    ->sortable(),
    
                Tables\Columns\TextColumn::make('remaining_amount')
                    ->label('Remaining Amount')
                    ->money('PHP')
                    ->badge()
                    ->color(fn ($state) => $state <= 0 ? 'danger' : 'success')
                    ->sortable(),
    
                Tables\Columns\TextColumn::make('start_date')
                    ->label('Start Date')
                    ->date('M d, Y')
                    ->sortable(),
    
                Tables\Columns\TextColumn::make('end_date')
                    ->label('End Date')
                    ->date('M d, Y')
                    ->color('danger')
                    ->sortable(),
    
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Created By')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
    
                Tables\Columns\TextColumn::make('projects_count')
                    ->label('Total Projects')
                    ->counts('projects')
                    ->badge()
                    ->color('primary')
                    ->sortable(),
    
                Tables\Columns\TextColumn::make('projects_total_budget')
                    ->label('Allocated to Projects')
                    ->getStateUsing(fn ($record) => $record->projects->sum('total_budget'))
                    ->money('PHP')
                    ->color('warning')
                    ->toggleable(isToggledHiddenByDefault: true),
    
                Tables\Columns\TextColumn::make('total_disbursed')
                    ->label('Total Disbursed')
                    ->getStateUsing(fn ($record) => $record->projects->flatMap->disbursements->sum('disbursed_amount'))
                    ->money('PHP')
                    ->badge()
                    ->color('danger')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                
                Tables\Filters\Filter::make('date_range')
                    ->form([
                        Forms\Components\DatePicker::make('start_date')
                            ->label('Start Date From'),
                        Forms\Components\DatePicker::make('end_date')
                            ->label('End Date To'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['start_date'],
                                fn (Builder $query, $date): Builder => $query->where('start_date', '>=', $date)
                            )
                            ->when(
                                $data['end_date'],
                                fn (Builder $query, $date): Builder => $query->where('end_date', '<=', $date)
                            );
                    }),
                
                Tables\Filters\Filter::make('budget_status')
                    ->form([
                        Forms\Components\Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'exhausted' => 'Exhausted',
                                'pending' => 'Pending',
                            ])
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        if ($data['status'] === 'active') {
                            return $query->where('remaining_amount', '>', 0);
                        }
                        if ($data['status'] === 'exhausted') {
                            return $query->where('remaining_amount', '<=', 0);
                        }
                        return $query;
                    }),
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
