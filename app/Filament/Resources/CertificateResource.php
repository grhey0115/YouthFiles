<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CertificateResource\Pages;
use App\Models\Certificate;
use Filament\Resources\Resource;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Components\Actions\Action;


class CertificateResource extends Resource
{
    protected static ?string $model = Certificate::class;

    protected static ?string $navigationLabel = 'Certificates';
    protected static ?string $navigationGroup = 'Management';
    
    protected static bool $shouldRegisterNavigation = false;
    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Certificate Title')
                    ->required(),
                Forms\Components\Textarea::make('description')
                    ->label('Certificate Description')
                    ->required(),
                Forms\Components\FileUpload::make('background_image')
                    ->label('Background Image')
                    ->disk('public')
                    ->directory('certificates/backgrounds')
                    ->preserveFilenames()
                    ->required(),
                
                // Table Repeater for signatures
                Forms\Components\Repeater::make('signatures')
                    ->label('Signatures')
                    ->relationship('signatures')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Name')
                            ->required(),
                        Forms\Components\TextInput::make('role')
                            ->label('Role')
                            ->required(),
                        Forms\Components\FileUpload::make('signature_image')
                            ->label('Signature Image')
                            ->disk('public')
                            ->directory('certificates/signatures')
                            ->preserveFilenames()
                            ->required(),
                    ])
                    ->columns(2) // Adjust the number of columns as needed
                    ->createItemButtonLabel('Add Signature'),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Title'),
                Tables\Columns\TextColumn::make('description')->label('Description'),
                Tables\Columns\TextColumn::make('signatures_count')->label('Signatures')->counts('signatures'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('Preview Certificate')
                    ->url(fn (Certificate $record) => route('certificate.preview', $record->id))
                    ->icon('heroicon-o-eye'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCertificates::route('/'),
            'create' => Pages\CreateCertificate::route('/create'),
            'edit' => Pages\EditCertificate::route('/{record}/edit'),
        ];
    }
}