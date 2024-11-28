<?php

namespace App\Filament\Widgets;

use App\Models\Budget;
use Filament\Widgets\ChartWidget;

class BudgetPieChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Budget Distribution';
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $budgets = Budget::all();

        return [
            'datasets' => [
                [
                    'data' => $budgets->pluck('total_amount')->toArray(),
                    'backgroundColor' => [
                        '#FF6384',  // Vibrant Pink
                        '#36A2EB',  // Bright Blue
                        '#FFCE56',  // Sunny Yellow
                        '#4BC0C0',  // Teal
                        '#9966FF',  // Lavender
                        '#FF9F40',  // Orange
                        '#7CFF40',  // Lime Green
                        '#40FFE6',  // Aqua
                    ],
                ]
            ],
            'labels' => $budgets->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
                'tooltip' => [
                    'callbacks' => [
                        'label' => "function(context) {
                            let value = context.raw;
                            return context.label + ': ₱' + value.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        }",
                    ],
                ],
            ],
        ];
    }
}