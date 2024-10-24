<?php

namespace App\Filament\Resources\AyudaResource\Pages;

use App\Filament\Resources\AyudaResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAyudas extends ListRecords
{
    protected static string $resource = AyudaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
