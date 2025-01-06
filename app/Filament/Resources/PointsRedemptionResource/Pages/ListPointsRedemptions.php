<?php

namespace App\Filament\Resources\PointsRedemptionResource\Pages;

use App\Filament\Resources\PointsRedemptionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPointsRedemptions extends ListRecords
{
    protected static string $resource = PointsRedemptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
         
        ];
    }
}
