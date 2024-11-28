<?php

namespace App\Filament\Widgets;

use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;
use App\Models\User;
use Carbon\Carbon;

class YouthChart extends ApexChartWidget
{
    protected static ?int $sort = 4;
    protected static ?string $chartId = 'youthChart';
    protected static ?string $heading = 'Youth Registrations per Month';

    protected function getOptions(): array
    {
        $dataByMonth = $this->getUserRegistrationStats();
        
        return [
            'chart' => [
                'type' => 'bar',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'Registrations',
                    'data' => $dataByMonth['counts'],
                ],
            ],
            'xaxis' => [
                'categories' => $dataByMonth['months'],
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'colors' => ['#f59e0b'], // Customize chart color
        ];
    }
   

    private function getUserRegistrationStats(): array
    {
        $startOfYear = now()->startOfYear();
        $endOfYear = now()->endOfYear();

        $users = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                     ->whereBetween('created_at', [$startOfYear, $endOfYear])
                     ->groupBy('month')
                     ->orderBy('month')
                     ->get();

        $months = [];
        $counts = [];
        foreach ($users as $user) {
            $months[] = Carbon::createFromFormat('m', $user->month)->format('M');
            $counts[] = (int) $user->count;
        }

        return [
            'months' => $months,
            'counts' => $counts,
        ];
    }
}