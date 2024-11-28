<?php

namespace App\Filament\Widgets;

use Saade\FilamentFullCalendar\Widgets\FullCalendarWidget;
use App\Models\Event;
use App\Models\Ayuda;
use App\Filament\Resources\EventResource;
use App\Filament\Resources\AyudaResource;
use Saade\FilamentFullCalendar\Actions;



class CalendarWidget extends FullCalendarWidget
{

    protected static ?int $sort = 5;
    public function fetchEvents(array $fetchInfo): array
    {
        // Fetch events from Event model
        $eventEvents = Event::query()
            ->where('event_date', '>=', $fetchInfo['start'])
            ->where('event_date', '<=', $fetchInfo['end'])
            ->get()
            ->map(fn (Event $event) => [
                'title' => $event->name,
                'start' => $event->event_date,
                'url' => EventResource::getUrl(name: 'edit', parameters: ['record' => $event]),
                'shouldOpenUrlInNewTab' => true,
                'backgroundColor' => '#4CAF50', // Green background for Event events
                'borderColor' => '#388E3C', // Optional: border color for better visibility
            ])
            ->all();

        // Fetch events from Ayuda model
        $ayudaEvents = Ayuda::query()
            ->where('assistance_date', '>=', $fetchInfo['start'])
            ->where('assistance_date', '<=', $fetchInfo['end'])
            ->get()
            ->map(fn (Ayuda $ayuda) => [
                'title' => $ayuda->title,
                'start' => $ayuda->assistance_date,
                'url' => AyudaResource::getUrl(name: 'edit', parameters: ['record' => $ayuda]),
                'shouldOpenUrlInNewTab' => true,
                'backgroundColor' => '#2196F3', // Blue background for Ayuda events
                'borderColor' => '#1976D2', // Optional: border color for better visibility
            ])
            ->all();

        // Combine both event sets
        return array_merge($eventEvents, $ayudaEvents);
    }

    protected function headerActions(): array
 {
     return [
         Actions\CreateAction::make()
             ->mountUsing(
                 function (Forms\Form $form, array $arguments) {
                     $form->fill([
                         'starts_at' => $arguments['start'] ?? null,
                         'ends_at' => $arguments['end'] ?? null
                     ]);
                 }
             )
     ];
 }
}
