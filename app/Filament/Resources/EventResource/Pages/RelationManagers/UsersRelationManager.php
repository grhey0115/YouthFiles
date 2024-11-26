<?php

namespace App\Filament\Resources\EventResource\Pages\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ButtonAction;
use Filament\Tables\Table;
use App\Models\User;
use Filament\Notifications\Notification;
use App\Filament\Exports\EventParticipantsExporter;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkAction;
use App\Filament\Exports\EventParticipantsExport;
use Barryvdh\DomPDF\Facade\Pdf;

class UsersRelationManager extends RelationManager
{
    protected static string $relationship = 'users'; // Relation in Event model
    protected static ?string $title = 'Event Attendees';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Full Name')
                    ->getStateUsing(function ($record) {
                        return "{$record->last_name}, {$record->first_name} {$record->middle_name}";
                    })
                    ->sortable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email Address')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('attendance_status')
                    ->label('Attendance Status')
                    ->sortable(),
            ])
            ->actions([
                ButtonAction::make('markPresent')
                    ->label('Mark as Present')
                    ->icon('heroicon-s-check-circle')
                    ->color('success')
                    ->action(function ($record) {
                        $event = $this->ownerRecord;

                        $record->events()->updateExistingPivot($event->id, [
                            'attendance_status' => 'present',
                        ]);

                        $record->increment('youth_points', $event->youth_points);

                        Notification::make()
                            ->title('Participant Marked Present!')
                            ->body("{$record->name} is marked as present and awarded {$event->youth_points} youth points.")
                            ->success()
                            ->send();
                    }),

                ButtonAction::make('markAbsent')
                    ->label('Mark as Absent')
                    ->color('danger')
                    ->icon('heroicon-s-x-circle')
                    ->action(function ($record) {
                        $event = $this->ownerRecord;

                        $record->events()->updateExistingPivot($event->id, [
                            'attendance_status' => 'absent',
                        ]);

                        Notification::make()
                            ->title('Participant Marked Absent')
                            ->body("{$record->name} has been marked as absent.")
                            ->success()
                            ->send();
                    }),
            ])
            ->headerActions([
                Action::make('export')
                ->icon('heroicon-s-arrow-down-tray')
                ->label('Export Attendee List')
                ->form([
                    Select::make('format')
                        ->label('Choose Export Format')
                        ->options([
                            'csv' => 'CSV',
                            'excel' => 'Excel',
                            'pdf' => 'PDF',
                        ])
                        ->required(),
                ])
                ->action(function (array $data) {
                    $event = $this->ownerRecord;
                    $format = $data['format'];
                    $fileName = 'event-participants.' . ($format === 'excel' ? 'xlsx' : $format);
            
                    // Fetch participants along with their pivot data (attendance status)
                    $participants = $event->users()->get()->map(function ($participant) use ($event) {
                        $pivot = $participant->events()->where('event_id', $event->id)->first();
            
                        return (object) [
                            'last_name' => $participant->last_name ?? 'No Last Name',
                            'first_name' => $participant->first_name ?? 'No First Name',
                            'middle_name' => $participant->middle_name ?? '', // Optional middle name
                            'email' => $participant->email ?? 'No Email',
                            'attendance_status' => $pivot ? $pivot->pivot->attendance_status : 'Not Set',
                        ];
                    });
            
                    if ($format === 'pdf') {
                        $pdf = Pdf::loadView('pdf.event-participants', [
                            'event' => $event,
                            'participants' => $participants,
                        ])->setPaper('a4', 'portrait');
            
                        return response()->streamDownload(
                            fn () => print($pdf->output()),
                            $fileName
                        );
                    } else {
                        $export = new EventParticipantsExport($participants);
            
                        if ($format === 'excel') {
                            return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                        } elseif ($format === 'csv') {
                            return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                        }
                    }
                })
                ->modalHeading('Export Attendee List')
                ->modalButton('Download')
            ])
            ->bulkActions([
                BulkAction::make('bulkMarkPresent')
                    ->label('Mark as Present')
                    ->icon('heroicon-s-check-circle')
                    ->color('success')
                    ->action(function (Collection $records) {
                        $event = $this->ownerRecord;

                        foreach ($records as $record) {
                            $record->events()->updateExistingPivot($event->id, [
                                'attendance_status' => 'present',
                            ]);

                            $record->increment('youth_points', $event->youth_points);
                        }

                        Notification::make()
                            ->title('Participants Marked Present')
                            ->body('Selected participants have been marked as present and awarded youth points.')
                            ->success()
                            ->send();
                    }),

                BulkAction::make('bulkMarkAbsent')
                    ->label('Mark as Absent')
                    ->icon('heroicon-s-x-circle')
                    ->color('danger')
                    ->action(function (Collection $records) {
                        $event = $this->ownerRecord;

                        foreach ($records as $record) {
                            $record->events()->updateExistingPivot($event->id, [
                                'attendance_status' => 'absent',
                            ]);
                        }

                        Notification::make()
                            ->title('Participants Marked Absent')
                            ->body('Selected participants have been marked as absent.')
                            ->success()
                            ->send();
                    }),

                        BulkAction::make('bulkExport')
                        ->label('Export Selected')
                        ->icon('heroicon-s-arrow-down-tray')
                        ->form([
                            Select::make('format')
                                ->label('Choose Export Format')
                                ->options([
                                    'csv' => 'CSV',
                                    'excel' => 'Excel',
                                    'pdf' => 'PDF',
                                ])
                                ->required(),
                        ])
                        ->action(function (Collection $records, array $data) {
                            $event = $this->ownerRecord;
                            $format = $data['format'];
                            $fileName = 'event-selected-participants.' . ($format === 'excel' ? 'xlsx' : $format);

                            // Ensure participant details and pivot (attendance_status) are loaded
                            $participantsWithDetails = $records->map(function ($participant) use ($event) {
                                // Fetch the pivot data related to this event, if it exists
                                $pivot = $participant->events()->where('event_id', $event->id)->first();
                                
                                return (object) [
                                    'last_name' => $participant->last_name ?? 'No Last Name',
                                    'first_name' => $participant->first_name ?? 'No First Name',
                                    'middle_name' => $participant->middle_name ?? '', // Optional middle name
                                    'email' => $participant->email ?? 'No Email',
                                    'attendance_status' => $pivot ? $pivot->pivot->attendance_status : 'Not Set',
                                ];
                            });

                            if ($format === 'pdf') {
                                $pdf = Pdf::loadView('pdf.event-participants', [
                                    'event' => $event,
                                    'participants' => $participantsWithDetails,
                                ])->setPaper('a4', 'portrait');

                                return response()->streamDownload(
                                    fn () => print($pdf->output()),
                                    $fileName
                                );
                            } else {
                                $export = new EventParticipantsExport($participantsWithDetails);

                                if ($format === 'excel') {
                                    return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::XLSX);
                                } elseif ($format === 'csv') {
                                    return Excel::download($export, $fileName, \Maatwebsite\Excel\Excel::CSV);
                                }
                            }
                        }),

            ]);
    }
}
