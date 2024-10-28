<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AyudaResource\Pages;
use App\Filament\Resources\AyudaResource\RelationManagers\Ayuda_ApplicantRelationManager;
use App\Filament\Resources\AyudaResource\RelationManagers\Ayuda_ApprovedListRelationManager;
use App\Models\Ayuda;
use App\Models\User;
use App\Models\EducationalBackground;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Toggle;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Repeater;
use Icetalker\FilamentTableRepeater\Forms\Components\TableRepeater;


class AyudaResource extends Resource
{
    protected static ?string $model = Ayuda::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationLabel = 'Assistance';
    protected static ?string $navigationGroup = 'Ayuda';

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
                Forms\Components\Select::make('sector')
                    ->options([
                        'health' => 'Health',
                        'education' => 'Education',
                        // Add more sectors as needed
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
                ->label('Start Date and Time')
                ->required(),
                Forms\Components\DateTimePicker::make('date_end')
                    ->label('End Date and Time')
                    ->required(),
                
                 // Add the Repeater for Requirements
                 TableRepeater::make('requirements')
                 ->relationship('requirements') // Assuming you have a `requirements` relationship in Ayuda model
                 ->schema([
                    Forms\Components\TextInput::make('requirement_name')->label('Requirement Name')->required(),
                    Forms\Components\Textarea::make('description')->label('Requirement Description')->required(),
                 ])
                 ->label('Program Requirements')
                 ->createItemButtonLabel('Add Requirement')
                
               
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
              
                Tables\Columns\TextColumn::make('title')->label('Title'),
                Tables\Columns\TextColumn::make('sector')->label('Sector'),
                Tables\Columns\TextColumn::make('date_start')
                    ->label('Start Date')
                    ->dateTime(),
                Tables\Columns\TextColumn::make('date_end')
                    ->label('End Date')
                    ->dateTime(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                // Add any necessary filters
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('viewApplicants')
                    ->label('View Applicants')
                    ->url(fn (Ayuda $record) => route('filament.admin.resources.ayudas.view', ['record' => $record->getKey()])),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            Ayuda_ApplicantRelationManager::class,
            Ayuda_ApprovedListRelationManager::class,
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
}
