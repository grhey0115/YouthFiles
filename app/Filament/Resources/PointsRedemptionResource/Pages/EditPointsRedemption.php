<?php

namespace App\Filament\Resources\PointsRedemptionResource\Pages;

use App\Filament\Resources\PointsRedemptionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPointsRedemption extends EditRecord
{
    protected static string $resource = PointsRedemptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
