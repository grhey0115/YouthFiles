<?php

// RequirementResource.php
namespace App\Filament\Resources;


use App\Filament\Resources\RequirementResource\Pages;
use App\Models\Requirement;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\Action;
use Filament\Forms;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Textarea;

class RequirementResource extends Resource
{
    protected static ?string $model = Requirement::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Ayuda';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('ayuda_id') // Use 'ayuda_id' as the field name
                    ->relationship('ayuda', 'title') // 'ayuda' matches the relationship in the model
                    ->required(),
                TextInput::make('requirement_name')->required(),
                TextInput::make('description'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('ayuda.title')->label('Assistance'), // Use 'ayuda' relationship here
                TextColumn::make('requirement_name'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
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
            'index' => Pages\ListRequirements::route('/'),
            'create' => Pages\CreateRequirement::route('/create'),
            'edit' => Pages\EditRequirement::route('/{record}/edit'),
        ];
    }
}
