<?php

namespace App\Filament\Exports;

use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;
use Illuminate\Support\Collection;
use App\Models\AyudaApplicant;

class ApprovedApplicantsExporter extends Exporter
{
    protected array $columns;
    protected ?Collection $data = null;
    protected string $filename = 'approved_applicants.xlsx';

    // Setter method for columns
    public function setColumns(array $columns): self
    {
        $this->columns = $columns;
        return $this;
    }

    // Setter method for data (query or collection)
    public function setData($data): self
    {
        $this->data = $data;
        return $this;
    }

    // Setter method for filename
    public function setFilename(string $filename): self
    {
        $this->filename = $filename;
        return $this;
    }

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('user.first_name')->label('First Name'),
            ExportColumn::make('user.last_name')->label('Last Name'),
            ExportColumn::make('user.email')->label('Email'),
            ExportColumn::make('aid_received')->label('Aid Received'),
            ExportColumn::make('payment_method')->label('Payment Method'),
            ExportColumn::make('payment_status')->label('Payment Status'),
            ExportColumn::make('assistance_received')->label('Assistance Received'),
            ExportColumn::make('applied_at')->label('Applied At'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your approved applicants export has completed, and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }

    public function query()
    {
        return $this->data instanceof Collection
            ? AyudaApplicant::query()->whereIn('id', $this->data->pluck('id'))
            : AyudaApplicant::query()->where('status', 'approved');
    }

    public function download(): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        // Pass columns and data to the parent download method
        return parent::download($this->filename, $this->columns, $this->query());
    }
}
