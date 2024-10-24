<?php

namespace App\Filament\Resources\UsersResource\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;
use App\Models\AdditionalInformation; // Import the AdditionalInformation model
use Illuminate\Support\Facades\DB;

class UserOverview extends BaseWidget
{
    protected function getStats(): array
    {
        // Fetch user sign-ups per month for the current year
        $userCounts = User::query()
            ->whereYear('created_at', now()->year)
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        // Prepare data for the chart
        $chartData = [];
        foreach (range(1, 12) as $month) {
            $chartData[] = $userCounts->get($month, 0); // Default to 0 if no data for the month
        }

        // Fetch total voters from the AdditionalInformation model
        $totalVoters = AdditionalInformation::query()->count();

        return [
            Stat::make('Users', User::query()->count())
                ->description('Total Users')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($chartData)
                ->color('success'),

            Stat::make('Voters', $totalVoters)
                ->description('Total Voters')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),
        ];
    }
}