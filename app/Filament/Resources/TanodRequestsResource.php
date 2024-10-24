<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TanodRequestsResource\Pages;
use App\Filament\Resources\TanodRequestsResource\RelationManagers;
use App\Models\TanodRequests;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TanodRequestsResource extends Resource
{
    protected static ?string $model = TanodRequests::class;

    protected static ?string $navigationIcon = 'heroicon-s-user';

    protected static ?string $navigationGroup = 'Requests';


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
            'index' => Pages\ListTanodRequests::route('/'),
            'create' => Pages\CreateTanodRequests::route('/create'),
            'view' => Pages\ViewTanodRequests::route('/{record}'),
            'edit' => Pages\EditTanodRequests::route('/{record}/edit'),
        ];
    }
}
