<?php

namespace App\Filament\Resources\DigitalPaymentTransferResource\Pages;

use App\Filament\Resources\DigitalPaymentTransferResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDigitalPaymentTransfer extends EditRecord
{
    protected static string $resource = DigitalPaymentTransferResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
