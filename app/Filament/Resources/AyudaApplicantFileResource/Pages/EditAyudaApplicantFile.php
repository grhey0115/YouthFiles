<?php

namespace App\Filament\Resources\AyudaApplicantFileResource\Pages;

use App\Filament\Resources\AyudaApplicantFileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAyudaApplicantFile extends EditRecord
{
    protected static string $resource = AyudaApplicantFileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
