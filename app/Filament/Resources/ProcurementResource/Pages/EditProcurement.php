<?php

namespace App\Filament\Resources\ProcurementResource\Pages;

use App\Filament\Resources\ProcurementResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProcurement extends EditRecord
{
    protected static string $resource = ProcurementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function beforeSave(): void
    {
        // Calculate the procurement cost based on procurement items
        $this->record->procurement_cost = collect($this->data['procurement_items'] ?? [])
            ->sum(fn($item) => $item['quantity'] * $item['unit_cost']);
    }
}
