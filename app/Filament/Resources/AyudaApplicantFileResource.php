<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AyudaApplicantFileResource\Pages;
use App\Models\AyudaApplicantFile;
use Hugomyb\FilamentMediaAction\Forms\Components\Actions\MediaAction;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\Action;




class AyudaApplicantFileResource extends Resource
{
    protected static ?string $model = AyudaApplicantFile::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static bool $shouldRegisterNavigation = false;
 
    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('file_path')
                    ->label('File Path')
                    ->disabled(),
                Forms\Components\TextInput::make('file_type')
                    ->label('File Type')
                    ->disabled(),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('file_type')->label('File Type'),
            ])
            ->actions([
                // Custom action to view media files (images, videos, PDFs, etc.)
                MediaAction::make('tutorial')
    ->iconButton()
    ->icon('heroicon-o-video-camera')
    ->media('https://www.youtube.com/watch?v=rN9XI9KCz0c&list=PL6tf8fRbavl3jfL67gVOE9rF0jG5bNTMi'),
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
            'index' => Pages\ListAyudaApplicantFiles::route('/'),
            'edit' => Pages\EditAyudaApplicantFile::route('/{record}/edit'),
        ];
    }
}
