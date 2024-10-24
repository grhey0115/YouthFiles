<?php

namespace App\Filament\Resources\AyudaResource\Pages;

use App\Filament\Resources\AyudaResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAyuda extends EditRecord
{
    protected static string $resource = AyudaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
