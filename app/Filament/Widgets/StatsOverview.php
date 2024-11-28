<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;
use App\Models\AdditionalInformation;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected function getStats(): array
    {
        // User sign-ups per month for the current year
        $userCounts = User::query()
            ->whereYear('created_at', now()->year)
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        // Prepare data for the chart
        $chartData = [];
        foreach (range(1, 12) as $month) {
            $chartData[] = $userCounts->get($month, 0);
        }

        // Comprehensive user statistics
        $userStats = User::selectRaw('
            COUNT(*) as total_users,
            COUNT(CASE WHEN email_verified_at IS NOT NULL THEN 1 END) as verified_users,
            COUNT(CASE WHEN created_at >= ? THEN 1 END) as new_users_this_month
        ', [Carbon::now()->startOfMonth()])
        ->first();

        // Role-based user count
        $totalVoters = AdditionalInformation::query()->count();

        return [
            Stat::make('Total Users', $userStats->total_users)
                ->description('All Registered Users')
                ->descriptionIcon('heroicon-m-users')
                ->chart($chartData)
                ->color('success')
                ->url(route('filament.admin.resources.users.index')),

            Stat::make('Verified Users', $userStats->verified_users)
                ->description('Email Verified')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('primary')
                ->url(route('filament.admin.resources.users.index', [
                    'tableFilters[verified][value]' => true
                ])),

            Stat::make('New Users', $userStats->new_users_this_month)
                ->description('This Month')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info'),

                Stat::make('Voters', $totalVoters)
                ->description('Total Voters')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),
        ];
    }
}