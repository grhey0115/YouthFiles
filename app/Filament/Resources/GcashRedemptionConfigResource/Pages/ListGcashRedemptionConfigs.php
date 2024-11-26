<?php

namespace App\Filament\Resources\GcashRedemptionConfigResource\Pages;

use App\Filament\Resources\GcashRedemptionConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListGcashRedemptionConfigs extends ListRecords
{
    protected static string $resource = GcashRedemptionConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
