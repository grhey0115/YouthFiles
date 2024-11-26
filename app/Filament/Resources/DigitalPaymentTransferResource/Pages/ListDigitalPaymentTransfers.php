<?php

namespace App\Filament\Resources\DigitalPaymentTransferResource\Pages;

use App\Filament\Resources\DigitalPaymentTransferResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDigitalPaymentTransfers extends ListRecords
{
    protected static string $resource = DigitalPaymentTransferResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
