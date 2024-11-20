<?php

namespace App\Filament\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\Budget;

/*class BudgetFinancialReportExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        // Fetch data from Budget with related projects and disbursements
        $budgets = Budget::with(['projects.disbursements'])->get();

        return $budgets->map(function ($budget) {
            $totalAllocatedToProjects = $budget->projects->sum('total_budget');
            $totalDisbursed = $budget->projects->flatMap->disbursements->sum('disbursed_amount');

            return [
                'Budget ID' => $budget->budget_id,
                'Budget Name' => $budget->name,
                'Total Budget' => $budget->total_amount,
                'Total Allocated to Projects' => $totalAllocatedToProjects,
                'Total Disbursed' => $totalDisbursed,
                'Remaining Balance' => $budget->total_amount - $totalDisbursed,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Budget ID',
            'Budget Name',
            'Total Budget (₱)',
            'Total Allocated to Projects (₱)',
            'Total Disbursed (₱)',
            'Remaining Balance (₱)',
        ];
    }
}*/



use Maatwebsite\Excel\Concerns\WithMapping;


class BudgetFinancialReportExport implements FromCollection, WithHeadings, WithMapping
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        // Transform your data into a collection suitable for export
        // This is where you'd map the $this->data to the desired format
        // Example (adapt as needed):
        return collect($this->data['projects'])->map(function ($project) {
            return [
                'Project Name' => $project['project_details']['name'],
                'Total Budget' => $project['project_details']['total_budget'],
                // ... other fields
            ];
        });

    }

    public function headings(): array
    {
        return [
            'Project Name',
            'Total Budget',
            // ... other headings
        ];
    }

    public function map($project): array
    {
        // Map the data for each row in the Excel file
        return [
            $project['project_details']['name'],
            $project['project_details']['total_budget'],
            // ... other fields
        ];
    }
}

