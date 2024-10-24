<?php

namespace App\Filament\Resources\ReleaseFundResource\Pages;

use App\Filament\Resources\ReleaseFundResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListReleaseFunds extends ListRecords
{
    protected static string $resource = ReleaseFundResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
