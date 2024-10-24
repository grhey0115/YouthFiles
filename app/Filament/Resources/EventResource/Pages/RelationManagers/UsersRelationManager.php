<?php

namespace App\Filament\Resources\EventResource\Pages\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ButtonAction;
use Filament\Tables\Table;
use App\Models\User;
use Filament\Notifications\Notification;
use App\Filament\Exports\EventParticipantsExporter;
use Filament\Tables\Actions\BulkActionGroup;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel; // Import Excel facade

class UsersRelationManager extends RelationManager
{
    protected static string $relationship = 'users'; // Relation in Event model

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('attendance_status')
                    ->label('Attendance Status')
                    ->sortable(),
            ])
            ->actions([
                ButtonAction::make('markPresent')
                    ->label('Mark Present')
                    ->color('success')
                    ->action(function ($record) {
                        $event = $this->ownerRecord;

                        $record->events()->updateExistingPivot($event->id, [
                            'attendance_status' => 'present',
                        ]);

                        $record->increment('youth_points', $event->youth_points);

                        Notification::make()
                            ->title('Success')
                            ->body("{$record->name} is marked as present and awarded {$event->youth_points} youth points.")
                            ->success()
                            ->send();
                    }),

                ButtonAction::make('markAbsent')
                    ->label('Mark Absent')
                    ->color('danger')
                    ->action(function ($record) {
                        $event = $this->ownerRecord;

                        $record->events()->updateExistingPivot($event->id, [
                            'attendance_status' => 'absent',
                        ]);

                        Notification::make()
                            ->title('Success')
                            ->body("{$record->name} is marked as absent.")
                            ->success()
                            ->send();
                    }),
            ])
            ->headerActions([
                ButtonAction::make('exportParticipants')
                    ->label('Export Participants')
                    ->action(function () {
                        $event = $this->ownerRecord;

                        // Perform the export synchronously
                        return Excel::download(new EventParticipantsExporter($event->users), 'participants.xlsx');
                    }),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    // No need to queue the export; handle it synchronously
                    ButtonAction::make('export_participants')
                        ->label('Export Selected Participants')
                        ->action(function (Collection $records) {
                            return Excel::download(new EventParticipantsExporter($records), 'participants.xlsx');
                        }),
                ]),
            ]);
    }
}
