<?php

namespace App\Filament\Resources\AICSResource\Pages;

use App\Filament\Resources\AICSResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAICS extends ListRecords
{
    protected static string $resource = AICSResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
