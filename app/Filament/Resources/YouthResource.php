<?php

namespace App\Filament\Resources;

use App\Filament\Resources\YouthResource\Pages;
use App\Filament\Resources\YouthResource\RelationManagers;
use App\Models\Youth;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Exports\YouthExporter;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Actions\Exports\Enums\ExportFormat;
use Illuminate\Support\Collection;
use pxlrbt\FilamentExcel\Actions\Tables\ExportAction;
use pxlrbt\FilamentExcel\Exports\ExcelExport;
use pxlrbt\FilamentExcel\Actions\Tables\ExportBulkAction;

class YouthResource extends Resource
{
    protected static ?string $model = Youth::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'User Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('first_name')
                    ->label('First Name')
                    ->required(),
                Forms\Components\TextInput::make('middle_name')
                    ->label('Middle Name')
                    ->nullable(), // Optional field
                Forms\Components\TextInput::make('last_name')
                    ->label('Last Name')
                    ->required(),
                Forms\Components\TextInput::make('phone_number')
                    ->label('Phone Number'),
                Forms\Components\TextInput::make('email')
                    ->label('Email'),

                    Forms\Components\CheckboxList::make('roles')
                    ->label('Roles')
                    ->relationship('roles', 'name')
                    ->columns(2),
                  
            ]);
    }
    public static function table(Table $table): Table
    {
        return $table

       
            ->columns([
           // User data
           Tables\Columns\TextColumn::make('first_name')
           ->label('First Name')
           ->sortable()
           ->searchable(),
           
       Tables\Columns\TextColumn::make('last_name')
           ->label('Last Name')
           ->sortable()
           ->searchable(),
           
       Tables\Columns\TextColumn::make('email')
           ->label('Email')
           ->sortable()
           ->searchable(),

       // Personal Information data
       Tables\Columns\TextColumn::make('personalInformation.sitio')
            ->searchable()
           ->label('Sitio'),

       Tables\Columns\TextColumn::make('personalInformation.religion')
            ->searchable()
           ->label('Religion'),
           Tables\Columns\TextColumn::make('personalInformation.civil_status')
           ->searchable()
           ->label('Civil Status'),
           Tables\Columns\TextColumn::make('personalInformation.is_solo_parent')
           ->searchable()
           ->label('Solo Parent?'),
           Tables\Columns\TextColumn::make('personalInformation.gender')
           ->searchable()
           ->label('Gender'),

       Tables\Columns\TextColumn::make('personalInformation.date_of_birth')
            ->searchable()
           ->label('Date of Birth'),

       // Educational Background data
       Tables\Columns\TextColumn::make('educationalBackground.current_status')
           ->label('Current Status'),

       Tables\Columns\TextColumn::make('educationalBackground.course')
           ->label('Course'),

       Tables\Columns\TextColumn::make('educationalBackground.year_graduated')
           ->label('Year Graduated'),

       // Emergency Contact data
       Tables\Columns\TextColumn::make('emergencyContact.name')
           ->label('Emergency Contact Name'),

       Tables\Columns\TextColumn::make('emergencyContact.contact_number')
           ->label('Emergency Contact Number'),
            ])
            ->filters([
                Tables\Filters\Filter::make('verified')
                ->query(fn (Builder $query): Builder => $query->whereNotNull('email_verified_at'))
                ->label('Verified'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                ExportAction::make(),
                
              
            ])
           
            
            ->headerActions([
                ExportAction::make()->exports([
                    ExcelExport::make()
                        ->fromTable()
                        ->askForFilename()
                        ->askForWriterType()
                ])
                
            ])
            ->bulkActions([
                // Bulk action group to combine multiple bulk actions
                BulkActionGroup::make([
                    
    
                    // Export selected rows (CSV/Excel are automatically available)
                    ExportBulkAction::make(),
    
                    // Custom bulk action: Mark as Reviewed
                    BulkAction::make('markAsReviewed')
                        ->label('Mark as Reviewed')
                        ->icon('heroicon-o-check')
                        ->action(function (Collection $records) {
                            $records->each->update(['status' => 'reviewed']);
                        })
                        ->requiresConfirmation()
                        ->color('success'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    public static function getWidgets(): array
    {
        return [
          
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListYouths::route('/'),
            'view' => Pages\ViewYouth::route('/{record}'),
            'edit' => Pages\EditYouth::route('/{record}/edit'),
        ];
    }
    public static function getEloquentQuery(): Builder
    {
        return Youth::query()
            ->with(['personalInformation', 'educationalBackground', 'emergencyContact']);
    }
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
