<?php

namespace App\Filament\Resources\AyudaResource\Pages;

use App\Filament\Resources\AyudaResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewAyuda extends ViewRecord
{
    protected static string $resource = AyudaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
