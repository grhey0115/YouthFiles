<?php

namespace App\Filament\Resources\BorrowRequestsResource\Pages;

use App\Filament\Resources\BorrowRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBorrowRequests extends EditRecord
{
    protected static string $resource = BorrowRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
