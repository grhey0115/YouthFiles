<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DisbursementResource\Pages;
use App\Models\Disbursement;
use App\Models\Procurement;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Notifications\Notification;

class DisbursementResource extends Resource
{
    protected static ?string $model = Disbursement::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Project Expenditure';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Disbursement Number
                TextInput::make('disbursement_no')
                    ->label('Disbursement No.')
                    ->required()
                    ->unique(Disbursement::class, 'disbursement_no', ignoreRecord: true) 
                    ->maxLength(255),  // Ensures a maximum length

                // Project Selection
                Select::make('project_id')
                    ->relationship('project', 'name')
                    ->required()
                    ->label('Project')
                    ->reactive()
                    ->afterStateUpdated(function (callable $set, callable $get) {
                        // Clear selected procurements and update remaining budget when the project changes
                        $set('procurements', []);
                        $project = \App\Models\Project::find($get('project_id'));
                        if ($project) {
                            $set('budget_remaining', $project->remaining_budget);
                        }
                    }),

                // Remaining Budget Display (from the Project)
                TextInput::make('budget_remaining')
                    ->numeric()
                    ->prefix('₱')
                    ->label('Remaining Budget')
                    ->readonly(),

                // Procurement Selection
                Select::make('procurements')
                    ->label('Procurement IDs')
                    ->multiple()
                    ->required()
                    ->searchable()
                    ->options(function (callable $get) {
                        $projectId = $get('project_id');
                        if ($projectId) {
                            return \App\Models\Procurement::where('project_id', $projectId)->pluck('pr_no', 'id');
                        }
                        return [];
                    })
                    ->reactive()
                    ->afterStateUpdated(function (callable $set, callable $get, $state) {
                        // Calculate and set the total procurement cost for the selected procurements
                        $totalProcurementCost = \App\Models\Procurement::whereIn('id', $state)->sum('procurement_cost');
                        $set('disbursed_amount', $totalProcurementCost);  // Update disbursed amount
                    }),

                // Recipient's Name
                TextInput::make('recipient_name')
                    ->required()
                    ->maxLength(255),

                // Disbursed Amount (auto-calculated from procurements)
                TextInput::make('disbursed_amount')
                    ->numeric()
                    ->prefix('₱')
                    ->required()
                    ->readonly()
                    ->afterStateUpdated(function (callable $set, callable $get) {
                        // Validate against the remaining budget
                        $project = \App\Models\Project::find($get('project_id'));
                        $disbursedAmount = $get('disbursed_amount');

                        if ($disbursedAmount > $project->remaining_budget) {
                            $set('disbursed_amount', $project->remaining_budget);  // Cap disbursement to available budget
                        }
                    }),

                // Disbursement Date
                Forms\Components\DatePicker::make('disbursement_date')
                    ->required(),

                // Payment Method Selection
                Select::make('payment_method')
                    ->label('Payment Method')
                    ->options([
                        'Bank Transfer' => 'Bank Transfer',
                        'Cash' => 'Cash',
                        'Cheque' => 'Cheque',
                        'Credit' => 'Credit',
                    ])
                    ->required(),

                // Reference Number
                TextInput::make('reference_number')
                    ->label('Disbursement Reference Number')
                    ->maxLength(255),

                // Attach Supporting Document
                Forms\Components\FileUpload::make('attached_document')
                    ->label('Attach Supporting Documents')
                    ->directory('disbursement-documents'),

                // Remarks
                Forms\Components\TextArea::make('remarks')
                    ->label('Remarks'),

                // Status
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'disapproved' => 'Disapproved',
                    ])
                    ->label('Status')
                    ->default('pending'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('disbursement_no')
                    ->label('Disbursement No.'),

                TextColumn::make('project.name')
                    ->label('Project'),
                  

                TextColumn::make('recipient_name')
                    ->label('Recipient'),

                TextColumn::make('disbursed_amount')
                    ->label('Amount')
                    ->money('PHP', true),

                TextColumn::make('disbursement_date')
                    ->label('Date')
                    ->date(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state) => match ($state) {
                        'pending' => 'gray',
                        'approved' => 'success',
                        'disapproved' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),

                // Approve action with budget update
                Action::make('approve')
                ->label('Approve')
                ->action(function (Disbursement $record) {
                    // Ensure the status is pending before approving
                    if ($record->status === 'pending') {
                        $project = $record->project;
            
                        // Check if the disbursed amount exceeds the remaining budget
                        if ($record->disbursed_amount > $project->remaining_budget) {
                            // Show a notification instead of throwing an exception
                            Notification::make()
                                ->title('Error')
                                ->danger()
                                ->body('Disbursed amount exceeds the available project budget.')
                                ->send();
            
                            return; // Stop further execution if the disbursed amount exceeds the remaining budget
                        }
            
                        // Update the disbursement status to approved
                        $record->status = 'approved';
                        $record->save();
            
                        // Deduct the disbursed amount from the project's remaining budget
                        $project->remaining_budget -= $record->disbursed_amount;
                        $project->save();
            
                        // Show a success notification after approval
                        Notification::make()
                            ->title('Approved')
                            ->success()
                            ->body('Disbursement has been approved and the project budget updated.')
                            ->send();
                    }
                })
                ->requiresConfirmation(),

                // Disapprove action
                Action::make('disapprove')
                    ->label('Disapprove')
                    ->action(function (Disbursement $record) {
                        if ($record->status === 'pending') {
                            $record->status = 'disapproved';
                            $record->save();
                        }
                    })
                    ->requiresConfirmation(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDisbursements::route('/'),
            'create' => Pages\CreateDisbursement::route('/create'),
            'edit' => Pages\EditDisbursement::route('/{record}/edit'),
        ];
    }
}
