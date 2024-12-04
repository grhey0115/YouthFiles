<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\Pages\RelationManagers\UsersRelationManager;
use App\Filament\Resources\EventResource\RelationManagers\PaymentsRelationManager;
use App\Models\Event;
use App\Models\CertificateSignature;
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
    protected static ?string $recordTitleAttribute = 'name';



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
                ->required(),
                
                Forms\Components\Section::make('Certificate Configuration')
                ->schema([
                    Forms\Components\Toggle::make('enable_certificates')
                        ->label('Enable Certificates')
                        ->default(false)
                        ->reactive(),
                    
                    Forms\Components\Select::make('certificate_theme')
                        ->label('Certificate Theme')
                        ->options([
                            'default' => 'Default (Minimalist)',
                            'professional' => 'Professional (Corporate)',
                            'elegant' => 'Elegant (Formal)',
                            'modern' => 'Modern (Contemporary)',
                            'classic' => 'Classic (Traditional)',
                            'creative' => 'Creative (Artistic)',
                        ])
                        ->default('default')
                        ->visible(fn ($get) => $get('enable_certificates') === true),
                    
                    Forms\Components\ColorPicker::make('certificate_primary_color')
                        ->label('Primary Color')
                        ->visible(fn ($get) => $get('enable_certificates') === true),
                    
                    Forms\Components\ColorPicker::make('certificate_secondary_color')
                        ->label('Secondary Color')
                        ->visible(fn ($get) => $get('enable_certificates') === true),
                    
                    Forms\Components\Select::make('certificate_orientation')
                        ->label('Certificate Orientation')
                        ->options([
                            'landscape' => 'Landscape',
                            'portrait' => 'Portrait',
                        ])
                        ->default('landscape')
                        ->visible(fn ($get) => $get('enable_certificates') === true),
                    
                    Forms\Components\Select::make('certificate_paper_size')
                        ->label('Paper Size')
                        ->options([
                            'a4' => 'A4',
                            'letter' => 'Letter',
                            'legal' => 'Legal',
                        ])
                        ->default('a4')
                        ->visible(fn ($get) => $get('enable_certificates') === true),

                    // Signatories Repeater
                    Forms\Components\Repeater::make('certificateSignatories')
                        ->relationship('certificateSignatories')
                        ->schema([
                            Forms\Components\TextInput::make('name')
                                ->label('Signatory Name')
                                ->required(),
                            Forms\Components\TextInput::make('role')
                                ->label('Signatory Role')
                                ->required(),
                            Forms\Components\FileUpload::make('signature_path')
                                ->label('Signature')
                                ->image()
                                ->directory('signatures')
                                ->required(),
                        ])
                        ->columns(3)
                        ->addable(true)
                        ->deletable(true)
                        ->reorderable(true)
                        ->defaultItems(1)
                        ->visible(fn ($get) => $get('enable_certificates') === true)
                ])
                ->columns(2)
        ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\ImageColumn::make('header_image')
                ->label('Header')
                ->circular()
                ->toggleable(),

            Tables\Columns\TextColumn::make('name')
                ->label('Event Name')
                ->searchable()
                ->sortable()
                ->wrap(),

            Tables\Columns\BadgeColumn::make('type')
                ->label('Event Type')
                ->icon(fn (string $state): string => match ($state) {
                    'seminar' => 'heroicon-m-academic-cap',
                    'workshop' => 'heroicon-m-wrench',
                    'sports' => 'heroicon-m-trophy',
                    'community_service' => 'heroicon-m-heart',
                    default => 'heroicon-m-globe-alt'
                })
                ->color(fn (string $state): string => match ($state) {
                    'seminar' => 'primary',
                    'workshop' => 'success',
                    'sports' => 'warning',
                    'community_service' => 'danger',
                    default => 'secondary'
                }),

            Tables\Columns\BadgeColumn::make('category')
                ->label('Category')
                ->color(fn (string $state): string => match ($state) {
                    'sports' => 'warning',
                    'education' => 'primary',
                    'outreach' => 'success',
                    'community' => 'danger',
                    default => 'secondary'
                }),

            Tables\Columns\BadgeColumn::make('status')
                ->label('Status')
                ->color(fn (string $state): string => match ($state) {
                    'draft' => 'gray',
                    'published' => 'primary',
                    'ongoing' => 'success',
                    'ended' => 'danger',
                    'canceled' => 'warning',
                    default => 'secondary'
                }),

            Tables\Columns\TextColumn::make('start_time')
                ->label('Start Time')
                ->dateTime('M d, Y H:i')
                ->sortable(),

            Tables\Columns\TextColumn::make('end_time')
                ->label('End Time')
                ->dateTime('M d, Y H:i')
                ->sortable(),

            Tables\Columns\TextColumn::make('registration_fee')
                ->label('Reg. Fee')
                ->money('PHP')
                ->sortable(),

            Tables\Columns\TextColumn::make('slots')
                ->label('Slots')
                ->badge()
                ->color(fn ($state) => $state <= 5 ? 'danger' : 'success')
                ->sortable(),

            Tables\Columns\TextColumn::make('users_count')
                ->label('Participants')
                ->counts('users')
                ->badge()
                ->color(fn ($state, $record) => $state >= $record->slots ? 'danger' : 'primary')
                ->sortable(),

            Tables\Columns\TextColumn::make('youth_points')
                ->label('Youth Points')
                ->badge()
                ->color('info')
                ->sortable(),

            Tables\Columns\TextColumn::make('location')
                ->label('Location')
                ->limit(20)
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->defaultSort('start_time', 'desc')
        ->filters([
            Tables\Filters\SelectFilter::make('type')
                ->options([
                    'seminar' => 'Seminar',
                    'workshop' => 'Workshop',
                    'sports' => 'Sports',
                    'community_service' => 'Community Service',
                ]),
            
            Tables\Filters\SelectFilter::make('category')
                ->options([
                    'sports' => 'Sports',
                    'education' => 'Education',
                    'outreach' => 'Outreach',
                    'community' => 'Community Service',
                ]),
            
            Tables\Filters\SelectFilter::make('status')
                ->options([
                    'draft' => 'Draft',
                    'published' => 'Published',
                    'ongoing' => 'Ongoing',
                    'ended' => 'Ended',
                    'canceled' => 'Canceled',
                ]),
        ])
        ->actions([
            Tables\Actions\ViewAction::make(),
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
          //  Tables\Actions\Action::make('viewParticipants')
               // ->label('Participants')
              //  ->icon('heroicon-m-user-group')
              //  ->url(fn (Event $record) => route('filament.admin.resources.events.view', ['record' => $record->getKey()])),
        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
                Tables\Actions\RestoreBulkAction::make(),
            ]),
        ])
        ->emptyStateActions([
            Tables\Actions\CreateAction::make(),
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
