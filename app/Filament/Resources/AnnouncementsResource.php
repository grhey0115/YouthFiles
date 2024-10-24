<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AnnouncementsResource\Pages;
use App\Filament\Resources\AnnouncementsResource\RelationManagers;
use App\Models\Announcements;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\User;
use App\Events\NewAnnouncementCreated;

class AnnouncementsResource extends Resource
{
    protected static ?string $model = Announcements::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Announcement Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Title')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Textarea::make('message')
                            ->label('Message')
                            ->required(),

                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->default(now())
                            ->required(),
                    ]),
            ]);
    }
    

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('id')
                ->label('ID')
                ->sortable(),

            Tables\Columns\TextColumn::make('title')
                ->label('Title')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('published_at')
                ->label('Published At')
                ->dateTime('F j, Y, g:i a')
                ->sortable(),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Created At')
                ->dateTime('F j, Y, g:i a')
                ->sortable(),
        ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListAnnouncements::route('/'),
            'create' => Pages\CreateAnnouncements::route('/create'),
            'view' => Pages\ViewAnnouncements::route('/{record}'),
            'edit' => Pages\EditAnnouncements::route('/{record}/edit'),
        ];
    }


    protected function afterCreate(): void
    {
        $announcement = $this->record; // The newly created announcement
        
        // Broadcast the event to notify other users
        event(new NewAnnouncementCreated($announcement));
    }
}
