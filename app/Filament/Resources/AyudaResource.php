<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AyudaResource\Pages;
use App\Filament\Resources\AyudaResource\RelationManagers\Ayuda_ApplicantRelationManager;
use App\Filament\Resources\AyudaResource\RelationManagers\Ayuda_ApprovedListRelationManager;
use App\Filament\Resources\AyudaResource\RelationManagers\DonationsRelationManager;
use App\Filament\Resources\AyudaResource\RelationManagers\VolunteerApplicantsRelationManager;
use App\Filament\Resources\AyudaResource\RelationManagers\VolunteerOpportunitiesRelationManager;
use App\Models\Ayuda;
use App\Models\VolunteerApplication;
use App\Models\User;
use App\Models\Donation;
use App\Models\VolunteerOpportunity;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
use Filament\InfoLists\InfoList;
use Filament\Forms\Components\InfoList\Entry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\KeyValueEntry;
use Filament\Infolists\Components\DateEntry;
use Filament\Infolists\Components\BooleanEntry;
use Illuminate\Support\Facades\Storage;
use Icetalker\FilamentTableRepeater\Forms\Components\TableRepeater;

class AyudaResource extends Resource
{
    protected static ?string $model = Ayuda::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationLabel = 'Assistance';
    protected static ?string $navigationGroup = 'Ayuda';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            Forms\Components\FileUpload::make('header')
                ->label('Header Image')
                ->image()
                ->directory('header-images')
                ->required(),
                
            Forms\Components\TextInput::make('title')
                ->required(),

            Forms\Components\Textarea::make('description')
                ->label('Program Description')
                ->required(),

                Forms\Components\TextInput::make('location')
                ->label('Location')
                ->required(),

            Forms\Components\Select::make('sector')
                ->options([
                    'health' => 'Health',
                    'education' => 'Education',
                ])
                ->required(),

            Forms\Components\Select::make('official_in_charge')
                ->multiple()
                ->label('SK Official In Charge')
                ->options(User::all()->pluck('name', 'id'))
                ->searchable(),

            Forms\Components\Select::make('assistance_type')
                ->label('Type of Assistance')
                ->options([
                    'cash' => 'Cash Assistance',
                    'education' => 'Educational Assistance',
                    'livelihood' => 'Livelihood Support',
                    'health' => 'Health Assistance',
                    'AICS' => 'AICS',
                ])
                ->required(),

            Forms\Components\TextInput::make('max_beneficiaries')
                ->label('Maximum Beneficiaries')
                ->numeric(),

            Forms\Components\Select::make('disbursement_method')
                ->label('Disbursement Method')
                ->options([
                    'cash' => 'Cash Distribution',
                    'bank_transfer' => 'Bank Transfer',
                    'in_person' => 'In-Person Collection',
                ])
                ->required(),

            Forms\Components\Select::make('status')
                ->label('Status')
                ->options([
                    'open' => 'Open',
                    'closed' => 'Closed',
                    'in_progress' => 'In Progress',
                    'pending_approval' => 'Pending Approval',
                    'suspended' => 'Suspended',
                ])
                ->default('pending_approval')
                ->required(),

            Forms\Components\DateTimePicker::make('date_start')
                ->label('Start of Registration')
                ->required(),

            Forms\Components\DateTimePicker::make('date_end')
                ->label('End of Registration')
                ->required(),

                Forms\Components\DateTimePicker::make('assistance_date')
                ->label('Assistance Date')
                ->required()
                ->helperText('Select the date when the assistance is provided.'),

            // Requirements Repeater
            TableRepeater::make('requirements')
                ->relationship('requirements')
                ->schema([
                    Forms\Components\TextInput::make('requirement_name')
                        ->label('Requirement Name')
                        ->required(),

                    Forms\Components\Textarea::make('description')
                        ->label('Requirement Description')
                        ->required(),
                ])
                ->label('Program Requirements')
                ->createItemButtonLabel('Add Requirement'),

                 // Toggle for Donations - Reactive
            Toggle::make('needs_donations')
            ->label('Needs Donations')
            ->reactive()
            ->default(false),

        // Toggle for Volunteers - Reactive
        Toggle::make('needs_volunteers')
            ->label('Needs Volunteers')
            ->reactive()
            ->default(false),

        // Conditionally Render Donation Section Using Repeater
        Forms\Components\Group::make([
            Forms\Components\Section::make('Donation Campaigns')
                ->schema([
                    Repeater::make('donations')
                        ->label('Donation Campaigns')
                        ->relationship('donations')
                        ->schema([
                            Forms\Components\TextInput::make('title')
                                ->label('Donation Title')
                                ->required(),
                            Forms\Components\Select::make('donation_type')
                                ->label('Donation Type')
                                ->options([
                                    'money' => 'Money',
                                    'item' => 'Item',
                                    'service' => 'Service',
                                ])
                                ->required()
                                ->reactive(),

                            // Monetary donations
                            Forms\Components\TextInput::make('goal')
                                ->label('Monetary Goal')
                                ->numeric()
                                ->visible(fn ($get) => $get('donation_type') === 'money'),

                                Forms\Components\FileUpload::make('gcash_qr')
                                ->label('GCash QR Code')
                                ->directory('qr-codes')
                                ->image()
                                ->visible(fn ($get) => $get('donation_type') === 'money'),
                           

                    
                            // Item or Service donations
                            Forms\Components\TextInput::make('quantity')
                                ->label('Quantity')
                                ->numeric()
                                ->visible(fn ($get) => in_array($get('donation_type'), ['item', 'service'])),

                            Forms\Components\Textarea::make('description')
                                ->label('Description')
                                ->visible(fn ($get) => in_array($get('donation_type'), ['item', 'service'])),

                            Forms\Components\TextInput::make('estimated_value')
                                ->label('Estimated Value')
                                ->numeric()
                                ->visible(fn ($get) => in_array($get('donation_type'), ['item', 'service'])),

                            Forms\Components\DatePicker::make('deadline')
                                ->label('Deadline')
                                ->nullable(),
                            Toggle::make('is_active')
                                ->label('Visibility'),
                        ])
                        ->createItemButtonLabel('Add Donation Campaign'),
                ])
                ->hidden(fn ($get) => !$get('needs_donations')), // Conditionally show section based on toggle
        ]), // End of Group wrapping Donations Repeater

        // Conditionally Render Volunteers Section Based on Toggle
        Forms\Components\Group::make([
            Forms\Components\Section::make('Volunteer Opportunities')
                ->schema([
                    Repeater::make('volunteer_opportunities')
                        ->label('Volunteer Opportunities')
                        ->relationship('volunteerOpportunities')
                        ->schema([
                            Forms\Components\TextInput::make('role_title')
                                ->label('Role Title')
                                ->required(),
                            Forms\Components\TextInput::make('slots')
                                ->label('Number of Slots')
                                ->numeric()
                                ->required(),
                            Forms\Components\Textarea::make('description')
                                ->label('Role Description'),
                            Forms\Components\DatePicker::make('start_date')
                                ->label('Start Date')
                                ->required(),
                            Forms\Components\DatePicker::make('end_date')
                                ->label('End Date')
                                ->required(),
                            
                            Toggle::make('is_active')
                                ->label('Visibility'),
                        ])
                        ->createItemButtonLabel('Add Volunteer Opportunity'),
                ])
                ->hidden(fn ($get) => !$get('needs_volunteers')), // Conditionally show section based on toggle
        ]), // End of Group wrapping Volunteers TableRepeater
    ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\ImageColumn::make('header')
                ->label('Header')
                ->circular()
                ->toggleable(),

            Tables\Columns\TextColumn::make('title')
                ->label('Program Title')
                ->searchable()
                ->sortable()
                ->wrap(),

            Tables\Columns\BadgeColumn::make('sector')
                ->label('Sector')
                ->color(fn (string $state): string => match ($state) {
                    'health' => 'danger',
                    'education' => 'success',
                    default => 'primary'
                })
                ->icon(fn (string $state): string => match ($state) {
                    'health' => 'heroicon-m-heart',
                    'education' => 'heroicon-m-academic-cap',
                    default => 'heroicon-m-globe-alt'
                }),

            Tables\Columns\BadgeColumn::make('assistance_type')
                ->label('Assistance Type')
                ->color(fn (string $state): string => match ($state) {
                    'cash' => 'success',
                    'education' => 'primary',
                    'livelihood' => 'warning',
                    'health' => 'danger',
                    'AICS' => 'info',
                    default => 'secondary'
                }),

            Tables\Columns\BadgeColumn::make('status')
                ->label('Status')
                ->color(fn (string $state): string => match ($state) {
                    'open' => 'success',
                    'closed' => 'danger',
                    'in_progress' => 'warning',
                    'pending_approval' => 'info',
                    'suspended' => 'gray',
                    default => 'secondary'
                }),

            Tables\Columns\TextColumn::make('max_beneficiaries')
                ->label('Max Beneficiaries')
                ->numeric()
                ->sortable(),

            Tables\Columns\TextColumn::make('assistance_date')
                ->label('Assistance Date')
                ->date('M d, Y')
                ->sortable(),

            Tables\Columns\TextColumn::make('date_start')
                ->label('Registration Start')
                ->date('M d, Y')
                ->color('primary')
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('date_end')
                ->label('Registration End')
                ->date('M d, Y')
                ->color('danger')
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->defaultSort('assistance_date', 'desc')
        ->filters([
            Tables\Filters\SelectFilter::make('sector')
                ->options([
                    'health' => 'Health',
                    'education' => 'Education',
                ]),
            
            Tables\Filters\SelectFilter::make('assistance_type')
                ->options([
                    'cash' => 'Cash Assistance',
                    'education' => 'Educational Assistance',
                    'livelihood' => 'Livelihood Support',
                    'health' => 'Health Assistance',
                    'AICS' => 'AICS',
                ]),
            
            Tables\Filters\SelectFilter::make('status')
                ->options([
                    'open' => 'Open',
                    'closed' => 'Closed',
                    'in_progress' => 'In Progress',
                    'pending_approval' => 'Pending Approval',
                    'suspended' => 'Suspended',
                ]),
        ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('viewApplicants')
                    ->label('View Applicants')
                    ->url(fn (Ayuda $record) => route('filament.admin.resources.ayudas.view', ['record' => $record->getKey()])),
            ])
            ->defaultSort('created_at', 'desc')
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
    public static function infolist(Infolist $infolist): Infolist
{
    return $infolist
        ->schema([
            Section::make('Program Overview')
                ->schema([
                    // Basic Information
                    ImageEntry::make('header')
                        ->label('Header Image')
                        ->size(100),
                    TextEntry::make('title')
                        ->label('Title'),
                    TextEntry::make('description')
                        ->label('Program Description')
                        ->markdown(),
                    TextEntry::make('sector')
                        ->label('Sector')
                        ->badge(),
                    TextEntry::make('status')
                        ->label('Status')
                        ->badge()
                        ->color(fn (string $state): string => match ($state) {
                            'open' => 'success',
                            'closed' => 'danger',
                            'in_progress' => 'warning',
                            'pending_approval' => 'info',
                            'suspended' => 'danger',
                            default => 'secondary',
                        }),

                    // Program Details
                    TextEntry::make('assistance_type')
                        ->label('Type of Assistance')
                        ->badge(),
                    TextEntry::make('max_beneficiaries')
                        ->label('Maximum Beneficiaries'),
                    TextEntry::make('disbursement_method')
                        ->label('Disbursement Method'),
                    TextEntry::make('official_in_charge')
                        ->label('SK Officials In Charge'),

                    // Timeline
                    TextEntry::make('date_start')
                        ->label('Start Date and Time')
                        ->dateTime(),
                    TextEntry::make('date_end')
                        ->label('End Date and Time')
                        ->dateTime(),

                    // Requirements
                    TextEntry::make('requirements')
                        ->label('Program Requirements')

                        ->formatStateUsing(function ($record) {
                
                            return $record->requirements->map(function ($requirement) {
                                return "**{$requirement['requirement_name']}**\n{$requirement['description']}";
                            })
                            ->join("\n\n")
                            
                           ;
                        })
                        ->markdown(),

                    // Donation Campaigns
                    TextEntry::make('donations')
                        ->label('Active Donation Campaigns')
                        ->formatStateUsing(function ($record) {
                            return $record->donations->map(function ($donation) {
                                return "**{$donation->title}** - *{$donation->donation_type}*";
                            })->join("\n");
                        })
                        ->markdown()
                        ->visible(fn ($record) => $record->needs_donations),

                    // Volunteer Opportunities
                    TextEntry::make('volunteerOpportunities')
                        ->label('Available Positions')
                        ->formatStateUsing(function ($record) {
                            return $record->volunteerOpportunities->map(function ($opportunity) {
                                return "**{$opportunity->role_title}**\n" .
                                       "Slots: {$opportunity->slots}\n" .
                                       "Description: {$opportunity->description}\n";
                            })->join("\n\n");
                        })
                        ->markdown()
                        ->visible(fn ($record) => $record->needs_volunteers),
                ])
                ->columns(2), // Adjust column layout as needed
        ]);
}


    public static function getRelations(): array
    {
        return [
            Ayuda_ApplicantRelationManager::class,
            Ayuda_ApprovedListRelationManager::class,
            DonationsRelationManager::class,
            VolunteerApplicantsRelationManager::class,
            VolunteerOpportunitiesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAyudas::route('/'),
            'create' => Pages\CreateAyuda::route('/create'),
            'view' => Pages\ViewAyuda::route('/{record}'),
            'edit' => Pages\EditAyuda::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
    public function getHeaderImageUrlAttribute()
    {
        return $this->header ? asset('storage/' . $this->header) : null;
    }
}
