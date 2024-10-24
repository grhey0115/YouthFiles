<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CertificateRequestsResource\Pages;
use App\Models\CertificateRequests;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CertificateRequestsResource extends Resource
{
    protected static ?string $model = CertificateRequests::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Requests';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Define the form fields when creating or editing a certificate request
                Forms\Components\TextInput::make('fullName')
                    ->required()
                    ->label('Full Name'),
                Forms\Components\TextInput::make('documentType')
                    ->required()
                    ->label('Document Type'),
                Forms\Components\TextInput::make('purpose')
                    ->required()
                    ->label('Purpose'),
                Forms\Components\TextInput::make('contactNumber')
                    ->label('Contact Number'),
                Forms\Components\Textarea::make('comments')
                    ->label('Comments'),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'denied' => 'Denied',
                    ])
                    ->label('Status'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Define the columns you want to display in the table
                Tables\Columns\TextColumn::make('id')->label('ID')->sortable(),
                Tables\Columns\TextColumn::make('fullName')->label('Full Name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('documentType')->label('Document Type')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('purpose')->label('Purpose')->sortable(),
                Tables\Columns\TextColumn::make('status')->label('Status')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('created_at')->label('Date Requested')->sortable()->dateTime(),
            ])
            ->filters([
                // Add any filters you want, for example, by status
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'denied' => 'Denied',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(), // Optional: Add a view action if necessary
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Define relations if any (e.g., if CertificateRequests belongs to a User)
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCertificateRequests::route('/'),
            'create' => Pages\CreateCertificateRequests::route('/create'),
            'edit' => Pages\EditCertificateRequests::route('/{record}/edit'),
        ];
    }
}
