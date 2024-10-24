<?php

namespace App\Filament\Resources\YouthResource\Pages;

use App\Filament\Resources\YouthResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewYouth extends ViewRecord
{
    protected static string $resource = YouthResource::class;

  // public function mount(string|int $record): void
   // {
   //     parent::mount($record); // Call the parent method to ensure proper functionality
        
        // You can now inspect the loaded record and its relationships for debugging purposes
   //     dd($this->record->personalInformation, $this->record->educationalBackground, $this->record->emergencyContact);
   // }

    protected function getHeaderActions(): array
    {
        return [
           
        ];
    }
}
