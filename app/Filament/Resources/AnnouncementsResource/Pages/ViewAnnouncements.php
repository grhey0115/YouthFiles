<?php

namespace App\Filament\Resources\AnnouncementsResource\Pages;

use App\Filament\Resources\AnnouncementsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewAnnouncements extends ViewRecord
{
    protected static string $resource = AnnouncementsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
