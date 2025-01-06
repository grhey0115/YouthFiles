<?php

namespace App\Filament\Resources\TanodRequestsResource\Pages;

use App\Filament\Resources\TanodRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTanodRequests extends ListRecords
{
    protected static string $resource = TanodRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            
        ];
    }
}
