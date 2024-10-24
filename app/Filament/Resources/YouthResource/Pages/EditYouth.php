<?php

namespace App\Filament\Resources\YouthResource\Pages;

use App\Filament\Resources\YouthResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditYouth extends EditRecord
{
    protected static string $resource = YouthResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
