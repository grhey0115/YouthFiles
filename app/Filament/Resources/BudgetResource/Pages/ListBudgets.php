<?php

namespace App\Filament\Resources\BudgetResource\Pages;

use App\Filament\Resources\BudgetResource;
use App\Filament\Widgets\BudgetStatsOverview;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBudgets extends ListRecords
{
    protected static string $resource = BudgetResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
    protected function getHeaderWidgets(): array
    {
        return [
            BudgetStatsOverview::class,
        ];
    }
}
