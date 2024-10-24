<?php

namespace App\Filament\Exports;

use App\Models\Youth;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class YouthExporter extends Exporter
{
    protected static ?string $model = Youth::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('first_name')->label('First Name'),
            ExportColumn::make('last_name')->label('Last Name'),
            ExportColumn::make('email')->label('Email'),
            
            // Personal Information columns
            ExportColumn::make('personalInformation.sitio')->label('Sitio'),
            ExportColumn::make('personalInformation.religion')->label('Religion'),
            ExportColumn::make('personalInformation.civil_status')->label('Civil Status'),
            ExportColumn::make('personalInformation.is_solo_parent')->label('Solo Parent'),
            ExportColumn::make('personalInformation.gender')->label('Gender'),
            ExportColumn::make('personalInformation.date_of_birth')->label('Date of Birth'),
            
            // Educational Background columns
            ExportColumn::make('educationalBackground.current_status')->label('Current Status'),
            ExportColumn::make('educationalBackground.course')->label('Course'),
            ExportColumn::make('educationalBackground.year_graduated')->label('Year Graduated'),

            // Emergency Contact columns
            ExportColumn::make('emergencyContact.name')->label('Emergency Contact Name'),
            ExportColumn::make('emergencyContact.contact_number')->label('Emergency Contact Number'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your youth export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
