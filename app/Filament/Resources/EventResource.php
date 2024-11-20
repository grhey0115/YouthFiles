<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\Pages\RelationManagers\UsersRelationManager;
use App\Filament\Resources\EventResource\RelationManagers\PaymentsRelationManager;
use App\Models\Event;
use Filament\Resources\Resource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Columns\Column;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Concerns\InteractsWithTable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Carbon\Carbon;


class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Events';


    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextArea::make('description')->required(),
                Forms\Components\DateTimePicker::make('start_time')->required(),
                Forms\Components\DateTimePicker::make('end_time')->required(),
                Forms\Components\DateTimePicker::make('event_date')->required(),
               
                Forms\Components\TextInput::make('location')->required(), // Adding location field
                Forms\Components\TextInput::make('youth_points')
                    ->label('Youth Points')
                    ->numeric()
                    ->required(), // Adding youth points field

                    Forms\Components\TextInput::make('registration_fee') // Add registration fee input
                    ->label('Registration Fee')
                    ->numeric()
                    ->required(), // Required numeric field
              

                    Forms\Components\TextInput::make('slots')
                    ->label('Available Slots')
                    ->required()
                    ->numeric()
                    ->rules(['min:1']),

                    Forms\Components\FileUpload::make('header_image')
                    ->label('Header Image')
                    ->image()
                    ->optimize('webp')
                    ->directory('uploads/headers')
                    ->required(), // Adding file upload for header image
                
                    Forms\Components\FileUpload::make('qr_code_image') // Add file upload for QR code
                    ->label('Gcash QR Code')
                    ->image() // Ensure that it's an image
                    ->optimize('webp')
                    ->directory('uploads/gcashqr')
                    ->required(false), // Not mandatory

                    Forms\Components\TextInput::make('cancellation_days_before')
                    ->label('Days Before Event to Prevent Cancellation')
                    ->numeric()
                    ->default(3)
                    ->required(),

                    Forms\Components\Select::make('status')
                ->label('Event Status')
                ->options([
                    'draft' => 'Draft',
                    'published' => 'Published',
                    'ongoing' => 'Ongoing',
                    'ended' => 'Ended',
                    'canceled' => 'Canceled',
                ])
                ->default('draft') // Ensures default value if not set
                ->required(),


                Forms\Components\Select::make('type')
                ->label('Event Type')
                ->options([
                    'seminar' => 'Seminar',
                    'workshop' => 'Workshop',
                    'sports' => 'Sports',
                    'community_service' => 'Community Service',
                ])
                ->required(),


                Forms\Components\Select::make('category')
                ->label('Event Category')
                ->options([
                    'sports' => 'Sports',
                    'education' => 'Education',
                    'outreach' => 'Outreach',
                    'community' => 'Community Service',
                ])
                ->required()
                
        ]);
            

      
            
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Event Name'),
             
                Tables\Columns\TextColumn::make('start_time')->dateTime()->label('Start Time'),
                Tables\Columns\TextColumn::make('end_time')->dateTime()->label('End Time')
                ->sortable(),
                Tables\Columns\TextColumn::make('status')
                ->label('Status')
                ->sortable()
                ->color(function ($state) {
                    return $state === 'ongoing' ? 'success' : ($state === 'ended' ? 'danger' : 'gray');
                }), // 
                Tables\Columns\TextColumn::make('registration_fee')->label('Registration Fee')->money('PHP'), // Display registration fee
                Tables\Columns\TextColumn::make('slots') // Display available slots in table
                    ->label('Available Slots')
                    ->sortable(),
                Tables\Columns\TextColumn::make('users_count')
                    ->label('Participants')
                    ->counts('users')
                    ->sortable(),

                Tables\Columns\TextColumn::make('type')
                ->label('Event Type')
                ->sortable(),

            // Display Event Category in Table
            Tables\Columns\TextColumn::make('category')
                ->label('Event Category')
                ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                // Add any table filters if needed
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
             //   Tables\Actions\Action::make('viewParticipants')
                 //   ->label('View Participants')
                  //  ->url(fn (Event $record) => route('filament.resources.events.relationManager', [$record->getKey()]))
                  //  ->icon('heroicon-o-users')
                  Tables\Actions\deleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Events';
    }

    public static function getNavigationLabel(): string
    {
        return 'Events';
    }

    public static function getRelations(): array
    {
        return [
            PaymentsRelationManager::class, 
            UsersRelationManager::class,

        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
    public static function getEloquentQuery(): Builder
    {
        $now = Carbon::now();

        // Update events where end_time has passed and status is still 'ongoing'
        Event::where('end_time', '<', $now)
            ->where('status', 'ongoing')
            ->update(['status' => 'ended']);

        return Event::query();
    }
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
