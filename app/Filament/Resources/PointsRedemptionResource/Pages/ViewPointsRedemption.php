<?php

namespace App\Filament\Resources\PointsRedemptionResource\Pages;

use App\Filament\Resources\PointsRedemptionResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPointsRedemption extends ViewRecord
{
    protected static string $resource = PointsRedemptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
