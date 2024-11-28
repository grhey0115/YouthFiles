<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Ayuda;
use App\Models\AyudaApplicant;
use Illuminate\Support\Facades\DB;

class KeyMetricsOverview extends BaseWidget
{
    protected static ?int $sort = 3;
    protected function getStats(): array
    {
        // Fetch Ayuda Requests Pending Approval per month for the current year
        $pendingRequestsCounts = AyudaApplicant::query()
            ->where('status', 'pending')
            ->whereYear('created_at', now()->year)
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Prepare data for the chart with all months (including zeros for months with no data)
        $pendingRequestsChartData = array_map(
            function($month) use ($pendingRequestsCounts) {
                return $pendingRequestsCounts[$month] ?? 0;
            },
            range(1, 12)
        );

        // Calculate statistics
        $pendingApplicants = AyudaApplicant::where('status', 'pending')->count();
        $activeEvents = Ayuda::whereIn('status', ['open', 'in_progress'])->count();
        $allEvents = Ayuda::count(); // Count all events regardless of status

        return [
            Stat::make('Pending Applications', $pendingApplicants)
                ->description('Ayuda Applicants Pending Approval')
                ->descriptionIcon('heroicon-m-document-text')
                ->chart($pendingRequestsChartData)
                ->color('warning'),

            Stat::make('Active Assistance Programs', $activeEvents)
                ->description('Currently Active Ayuda Events')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('success'),

            Stat::make('Total Assistance Programs', $allEvents)
                ->description('All Ayuda Events')
                ->descriptionIcon('heroicon-m-clipboard-document-list')
                ->color('info'),
        ];
    }
}