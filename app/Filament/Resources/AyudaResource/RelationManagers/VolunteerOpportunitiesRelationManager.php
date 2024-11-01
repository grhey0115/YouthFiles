<?php

namespace App\Filament\Resources\AyudaResource\RelationManagers;

use Filament\Forms;
use Filament\Tables;
use Filament\Resources\RelationManagers\RelationManager;

class VolunteerOpportunitiesRelationManager extends RelationManager
{
    protected static string $relationship = 'acceptedVolunteers';
    protected static ?string $title = 'Approved Volunteers';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('volunteer_opportunity_id')
                    ->relationship('volunteerOpportunity', 'role_title')
                    ->required(),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\DatePicker::make('accepted_on')
                    ->required(),
                Forms\Components\Toggle::make('is_volunteered')
                    ->label('Has Volunteered'),
            ]);
    }

    public function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Volunteer Name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('volunteerOpportunity.role_title')
                    ->label('Role'),
                Tables\Columns\TextColumn::make('accepted_on')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_volunteered')
                    ->boolean()
                    ->label('Has Volunteered'),
                Tables\Columns\TextColumn::make('volunteerOpportunity.start_date')
                    ->date()
                    ->label('Start Date'),
                Tables\Columns\TextColumn::make('volunteerOpportunity.end_date')
                    ->date()
                    ->label('End Date'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('is_volunteered')
                    ->options([
                        '1' => 'Volunteered',
                        '0' => 'Not Yet Volunteered',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}