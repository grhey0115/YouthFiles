<?php

namespace App\Filament\Resources\TanodRequestsResource\Pages;

use App\Filament\Resources\TanodRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTanodRequests extends EditRecord
{
    protected static string $resource = TanodRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
