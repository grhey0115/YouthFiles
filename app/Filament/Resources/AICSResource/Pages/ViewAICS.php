<?php

namespace App\Filament\Resources\AICSResource\Pages;

use App\Filament\Resources\AICSResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewAICS extends ViewRecord
{
    protected static string $resource = AICSResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
