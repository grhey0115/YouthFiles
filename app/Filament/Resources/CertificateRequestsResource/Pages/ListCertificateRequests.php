<?php

namespace App\Filament\Resources\CertificateRequestsResource\Pages;

use App\Filament\Resources\CertificateRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCertificateRequests extends ListRecords
{
    protected static string $resource = CertificateRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
