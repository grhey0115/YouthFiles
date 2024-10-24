<?php

namespace App\Filament\Resources\TanodRequestsResource\Pages;

use App\Filament\Resources\TanodRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewTanodRequests extends ViewRecord
{
    protected static string $resource = TanodRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
