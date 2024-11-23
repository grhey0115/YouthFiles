<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationsVolunteerismResource\Pages;
use App\Filament\Resources\DonationsVolunteerismResource\RelationManagers;
use App\Models\DonationsVolunteerism;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DonationsVolunteerismResource extends Resource
{
    protected static ?string $model = DonationsVolunteerism::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Donations & Volunteerism';
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $navigationGroup = 'Ayuda';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListDonationsVolunteerisms::route('/'),
            'create' => Pages\CreateDonationsVolunteerism::route('/create'),
            'view' => Pages\ViewDonationsVolunteerism::route('/{record}'),
            'edit' => Pages\EditDonationsVolunteerism::route('/{record}/edit'),
        ];
    }
}
