<?php

namespace App\Filament\Resources\DigitalPaymentTransferResource\Pages;

use App\Filament\Resources\DigitalPaymentTransferResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewDigitalPaymentTransfer extends ViewRecord
{
    protected static string $resource = DigitalPaymentTransferResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
