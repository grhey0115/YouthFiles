<?php

namespace App\Filament\Resources\GcashRedemptionConfigResource\Pages;

use App\Filament\Resources\GcashRedemptionConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGcashRedemptionConfig extends EditRecord
{
    protected static string $resource = GcashRedemptionConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
