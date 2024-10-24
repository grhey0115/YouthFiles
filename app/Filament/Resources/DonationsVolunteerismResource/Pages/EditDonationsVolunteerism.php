<?php

namespace App\Filament\Resources\DonationsVolunteerismResource\Pages;

use App\Filament\Resources\DonationsVolunteerismResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDonationsVolunteerism extends EditRecord
{
    protected static string $resource = DonationsVolunteerismResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
