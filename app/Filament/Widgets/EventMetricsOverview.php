<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventMetricsOverview extends BaseWidget
{
    protected static ?int $sort = 2;
    protected function getStats(): array
    {
        // Get monthly event counts for the current year
        $monthlyEventCounts = Event::query()
            ->whereYear('created_at', now()->year)
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Prepare chart data
        $eventChartData = array_map(
            function($month) use ($monthlyEventCounts) {
                return $monthlyEventCounts[$month] ?? 0;
            },
            range(1, 12)
        );

        // Get comprehensive event statistics in a single query
        $eventStats = Event::selectRaw('
            COUNT(*) as total_events,
            COALESCE(SUM(registration_fee), 0) as total_gross_fees,
            COALESCE(AVG(NULLIF(registration_fee, 0)), 0) as average_fee,
            COUNT(CASE WHEN status = "published" THEN 1 END) as upcoming_events
        ')->first();

        // Calculate total participants across all events
        $totalParticipants = Event::withCount('users')
            ->get()
            ->sum('users_count');

        return [
            Stat::make('Total Events', $eventStats->total_events)
                ->description('All Events')
                ->descriptionIcon('heroicon-m-play')
                ->chart($eventChartData)
                ->color('success')
                ->url(route('filament.admin.resources.events.index')),

            Stat::make('Total Gross', '₱' . number_format($eventStats->total_gross_fees, 2))
                ->description('Total Registration Fees')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('primary')
                ->url(route('filament.admin.resources.events.index', [
                    'tableFilters[has_fee][value]' => true
                ])),

            Stat::make('Total Participants', number_format($totalParticipants))
                ->description('Across All Events')
                ->descriptionIcon('heroicon-m-users')
                ->color('warning')
                ->url(route('filament.admin.resources.events.index', [
                    'tableFilters[has_participants][value]' => true
                ])),

            Stat::make('Upcoming Events', $eventStats->upcoming_events)
                ->description('Published Future Events')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('info')
                ->url(route('filament.admin.resources.events.index', [
                    'tableFilters[status][value]' => 'published'
                ])),
        ];
    }
}