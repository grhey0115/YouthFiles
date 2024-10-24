<?php

namespace App\Filament\Resources\ComplianceMonitoringResource\Pages;

use App\Filament\Resources\ComplianceMonitoringResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListComplianceMonitorings extends ListRecords
{
    protected static string $resource = ComplianceMonitoringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
