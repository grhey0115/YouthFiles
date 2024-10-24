<?php

namespace App\Filament\Resources\YouthResource\Pages;

use App\Filament\Resources\YouthResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Tables\Actions\ExportAction;
use App\Filament\Exports\YouthExporter;

class ListYouths extends ListRecords
{
    protected static string $resource = YouthResource::class;

    protected function getHeaderActions(): array
    {
        return [
        ];
    }
}
