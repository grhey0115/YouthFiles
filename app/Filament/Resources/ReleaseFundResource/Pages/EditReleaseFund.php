<?php

namespace App\Filament\Resources\ReleaseFundResource\Pages;

use App\Filament\Resources\ReleaseFundResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditReleaseFund extends EditRecord
{
    protected static string $resource = ReleaseFundResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
