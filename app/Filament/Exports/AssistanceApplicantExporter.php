<?php

namespace App\Filament\Exports;

use App\Models\AyudaApplicant;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class AssistanceApplicantExporter extends Exporter
{
    protected static ?string $model = AyudaApplicant::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('user.first_name')->label('First Name'),
            ExportColumn::make('user.last_name')->label('Last Name'),
            ExportColumn::make('user.email')->label('Email'),
            
            // Assistance-specific columns
            ExportColumn::make('status')->label('Status'),
            ExportColumn::make('applied_at')->label('Applied At'),
            
            // Add more fields as needed, such as requirements or related data
            // ExportColumn::make('requirements.some_field')->label('Requirement Field'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your assistance applicant export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
