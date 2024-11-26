<?php

namespace App\Filament\Resources\EmergencyRequestResource\Pages;

use App\Filament\Resources\EmergencyRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewEmergencyRequest extends ViewRecord
{
    protected static string $resource = EmergencyRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
