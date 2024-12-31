<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UsersResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Widgets\StatsOverview;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Hugomyb\FilamentMediaAction\Forms\Components\Actions\MediaAction;
use Filament\Tables\Actions\Action;
use Illuminate\Support\Facades\Storage;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Mail;



class UsersResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'User Management';
    protected static ?string $recordTitleAttribute = 'full_name';
   

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('first_name')
                    ->label('First Name')
                    ->required(),
                Forms\Components\TextInput::make('middle_name')
                    ->label('Middle Name')
                    ->nullable(),
                Forms\Components\TextInput::make('last_name')
                    ->label('Last Name')
                    ->required(),
                Forms\Components\TextInput::make('phone_number')
                    ->label('Phone Number')
                    ->tel(),
                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),

                    Forms\Components\TextInput::make('password')
                    ->label('Password')
                    ->revealable()
                    ->password()
                    
                    ->nullable() // Allow null values during edits
                    ->minLength(8) // Enforce length only if entered
                   ->hiddenOn('edit')
                    ->required(fn ($context) => $context === 'create'),
                    
                    Forms\Components\TextInput::make('password_confirmation')
                    ->label('Confirm Password')
                    ->password()
                    ->nullable() // Allow null values during edits
                    ->hiddenOn('edit'),
  

                    Forms\Components\CheckboxList::make('roles')
                    ->relationship('roles', 'name')
                    ->searchable(),
            ]);
    }

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\ImageColumn::make('avatar')
                ->label('Avatar')
                ->circular()
                ->defaultImageUrl(function ($record) {
                    // Fallback to default avatar if no image exists
                    return $record->avatar 
                        ? Storage::url($record->avatar) 
                        : asset('images/default-avatar.png');
                }),

            Tables\Columns\TextColumn::make('full_name')
                ->label('Full Name')
                ->getStateUsing(fn ($record) => 
                    trim($record->first_name . ' ' . 
                         ($record->middle_name ? $record->middle_name . ' ' : '') . 
                         $record->last_name)
                )
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('email')
                ->label('Email')
                ->icon('heroicon-m-envelope')
                ->copyable()
                ->sortable()
                ->searchable(),

            Tables\Columns\TextColumn::make('phone_number')
                ->label('Phone')
                ->icon('heroicon-m-phone')
                ->copyable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\BadgeColumn::make('roles')
                ->label('Roles')
                ->getStateUsing(fn ($record) => 
                    $record->roles->pluck('name')->implode(', ')
                )
                ->color('primary')
                ->separator(','),

            Tables\Columns\TextColumn::make('email_verified_at')
                ->label('Verified')
                ->date()
                ->badge()
                ->color(fn ($state) => $state ? 'success' : 'danger')
                ->icon(fn ($state) => $state ? 'heroicon-m-check-badge' : 'heroicon-m-x-circle'),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Registered')
                ->since()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\BadgeColumn::make('approval_status')
                ->label('Status')
                ->colors([
                    'danger' => 'rejected',
                    'warning' => 'pending',
                    'success' => 'approved',
                ]),
        ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\Filter::make('verified')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('email_verified_at'))
                    ->label('Verified'),
            ])
            ->actions([
                // Add Approve Action
                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn ($record) => $record->approval_status === 'pending')
                    ->action(function ($record) {
                        $record->update([
                            'approval_status' => 'approved',
                            'approved_at' => now(),
                        ]);

                        // Send approval email
                        Mail::to($record->email)->send(new \App\Mail\AccountApproved($record));

                        Notification::make()
                            ->title('User Approved')
                            ->success()
                            ->send();
                    }),

                // Add Reject Action
                Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn ($record) => $record->approval_status === 'pending')
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $record->update([
                            'approval_status' => 'rejected',
                        ]);

                        // Send rejection email
                        Mail::to($record->email)->send(new \App\Mail\AccountRejected($record));

                        Notification::make()
                            ->title('User Rejected')
                            ->danger()
                            ->send();
                    }),
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                
                // Custom action to view media
              /*  Action::make('viewMedia')
                    ->label('View Media')
                    ->icon('heroicon-o-video-camera')
                    ->action(function ($record) {
                        // Use MediaAction or any custom logic for viewing media
                        return MediaAction::make('media')
                            ->media(fn($record) => $record->media_url)
                            ->autoplay(fn($record, $mediaType) => $mediaType === 'video');
                    })
                    ->requiresConfirmation(), // Optional: to show a modal
                    */
                

                  //  Action::make('activities')->url(fn ($record) => UsersResource::getUrl('activities', ['record' => $record]))
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUsers::route('/create'),
            //'activities' => Pages\Activities::route('/{record}/activities'),
            'edit' => Pages\EditUsers::route('/{record}/edit'),
        ];
    }
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
