<?php

namespace App\Filament\Resources\CertificateRequestsResource\Pages;

use App\Filament\Resources\CertificateRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCertificateRequests extends EditRecord
{
    protected static string $resource = CertificateRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
