<?php

namespace App\Filament\Resources\BorrowRequestsResource\Pages;

use App\Filament\Resources\BorrowRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewBorrowRequests extends ViewRecord
{
    protected static string $resource = BorrowRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
