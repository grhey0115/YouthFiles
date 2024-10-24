<?php

namespace App\Filament\Resources\ComplianceMonitoringResource\Pages;

use App\Filament\Resources\ComplianceMonitoringResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditComplianceMonitoring extends EditRecord
{
    protected static string $resource = ComplianceMonitoringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
