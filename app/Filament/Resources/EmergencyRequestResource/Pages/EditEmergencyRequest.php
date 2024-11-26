<?php

namespace App\Filament\Resources\EmergencyRequestResource\Pages;

use App\Filament\Resources\EmergencyRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEmergencyRequest extends EditRecord
{
    protected static string $resource = EmergencyRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
