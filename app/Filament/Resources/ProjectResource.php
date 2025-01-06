<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Filament\Resources\ProjectResource\RelationManagers\ProcurementRelationManager;
use App\Filament\Resources\ProjectResource\RelationManagers\DisbursementRelationManager;
use App\Filament\Resources\ProjectResource\RelationManagers\PurchaseRequestRelationManager;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use App\Models\Budget;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Columns\ImageColumn;
use Filament\Notifications\Notification;
use Filament\Forms\Components\TextInput;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'Project Expenditure';
    protected static ?int $navigationSort = 2;
    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            // Add project ID input
            Forms\Components\TextInput::make('project_id')  
            ->label('Project ID')  
            ->required()  
            ->unique(  
               table: Project::class,  
               column: 'project_id',  
               ignorable: fn ($record) => $record  
            )  
            ->rules(['required', 'string', 'max:255']),   // Ensure project_id is unique
            
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

            Forms\Components\Select::make('status')
                                    ->label('Status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'ongoing' => 'Ongoing',
                                        'completed' => 'Completed',
                                        'on_hold' => 'On Hold',
                                    ])
                                    ->default('draft')
                                    ->required(),

            Forms\Components\DatePicker::make('start_date')
                ->required(),

            Forms\Components\DatePicker::make('end_date')
                ->required(),

                TextInput::make('total_budget')
                ->numeric()
                ->prefix('₱')
                ->required()
                ->afterStateUpdated(function ($state, $get, $set) {
                    $budget = Budget::find($get('budget_id'));

                    if ($budget && $state > $budget->remaining_amount) {
                        Notification::make()
                            ->title('Invalid Budget')
                            ->body('Total budget exceeds available funds.')
                            ->danger()
                            ->send();

                        // Optionally, reset the input
                        $set('total_budget', null);

                        // Alternatively, throw an exception
                        throw ValidationException::withMessages([
                            'total_budget' => 'The total budget exceeds the available budget for this funding source.'
                        ]);
                    }
                }),

                Forms\Components\Hidden::make('remaining_budget')
                ->default(fn ($get) => $get('total_budget')) // Automatically set to total_budget
                ->required(),
          
        ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('project_id')
                ->label('Project Code')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('name')
                ->label('Project Name')
                ->searchable()
                ->sortable()
                ->wrap(),

          //  Tables\Columns\ImageColumn::make('header_image')
             //   ->label('Image')
            //    ->circular(),
                

            Tables\Columns\TextColumn::make('budget.name')
                ->label('Budget Source')
                ->searchable(),

            Tables\Columns\TextColumn::make('total_budget')
                ->label('Total Budget')
                ->money('PHP')
                ->color('primary')
                ->sortable(),

            Tables\Columns\TextColumn::make('remaining_budget')
                ->label('Remaining Budget')
                ->money('PHP')
                ->color(function ($state, $record) {
                    $percentage = $record->remaining_budget > 0 
                        ? ($state / $record->remaining_budget) * 100 
                        : 0;

                    return match(true) {
                        $percentage > 50 => 'success',
                        $percentage > 20 => 'warning',
                        default => 'danger'
                    };
                }),

            Tables\Columns\TextColumn::make('project_duration')
                ->label('Duration')
                ->getStateUsing(function ($record) {
                    $start = Carbon::parse($record->start_date);
                    $end = Carbon::parse($record->end_date);
                    return $start->diffInDays($end) . ' days';
                })
                ->badge()
                ->color('info'),

            Tables\Columns\TextColumn::make('date_range')
                ->label('Project Period')
                ->getStateUsing(function ($record) {
                    return Carbon::parse($record->start_date)->format('M d, Y') . 
                           ' - ' . 
                           Carbon::parse($record->end_date)->format('M d, Y');
                })
                ->wrap(),

                Tables\Columns\BadgeColumn::make('status')
                ->label('Status')
                ->formatStateUsing(fn (string $state): string => ucfirst($state))
                ->colors([
                    'gray' => 'draft',
                    'warning' => 'ongoing',
                    'success' => 'completed',
                    'danger' => 'on_hold',
                ]),
            Tables\Columns\TextColumn::make('procurements_count')
                ->counts('procurements')
                ->label('Procurements')
                ->badge()
                ->color('secondary'),

            Tables\Columns\TextColumn::make('disbursements_count')
                ->counts('disbursements')
                ->label('Disbursements')
                ->badge()
                ->color('secondary'),
        ])
        ->defaultSort('created_at', 'desc')
        ->filters([
            Tables\Filters\SelectFilter::make('status')
                ->options([
                    'Upcoming' => 'Upcoming',
                    'Ongoing' => 'Ongoing',
                    'Completed' => 'Completed'
                ]),
            Tables\Filters\SelectFilter::make('budget_id')
                ->relationship('budget', 'name')
                ->label('Budget Source')
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
            RelationManagers\PurchaseRequestRelationManager::class,
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

    public static function create(array $data): Project
    {
        $budget = Budget::findOrFail($data['budget_id']);

        // Check if the budget has enough funds
        if ($budget->remaining_amount < $data['total_budget']) {
            // Throw a Filament exception or display a notification
            throw new \Exception('Not enough budget remaining.');
        }

        $project = Project::create($data);

        // Deduct the project's budget from the main budget
        $budget->remaining_amount -= $data['total_budget'];
        $budget->save();

        return $project;
    }
}
