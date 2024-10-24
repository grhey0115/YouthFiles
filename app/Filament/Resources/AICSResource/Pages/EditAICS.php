<?php

namespace App\Filament\Resources\AICSResource\Pages;

use App\Filament\Resources\AICSResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAICS extends EditRecord
{
    protected static string $resource = AICSResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
