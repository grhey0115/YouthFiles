<?php

namespace App\Filament\Resources\DonationsVolunteerismResource\Pages;

use App\Filament\Resources\DonationsVolunteerismResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewDonationsVolunteerism extends ViewRecord
{
    protected static string $resource = DonationsVolunteerismResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
