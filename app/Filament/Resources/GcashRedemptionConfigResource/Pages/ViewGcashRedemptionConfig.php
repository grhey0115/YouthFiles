<?php

namespace App\Filament\Resources\GcashRedemptionConfigResource\Pages;

use App\Filament\Resources\GcashRedemptionConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewGcashRedemptionConfig extends ViewRecord
{
    protected static string $resource = GcashRedemptionConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
