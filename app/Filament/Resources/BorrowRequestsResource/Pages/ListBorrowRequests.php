<?php

namespace App\Filament\Resources\BorrowRequestsResource\Pages;

use App\Filament\Resources\BorrowRequestsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBorrowRequests extends ListRecords
{
    protected static string $resource = BorrowRequestsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
