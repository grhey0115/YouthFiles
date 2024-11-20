<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class BudgetExport implements FromCollection, WithHeadings, WithMapping
{
    protected $budgets;

    public function __construct($budgets)
    {
        $this->budgets = $budgets;
    }

    public function collection()
    {
        return $this->budgets;
    }

    public function headings(): array
    {
        return [
            'Budget ID',
            'Budget Name',
            'Total Amount',
            'Start Date',
            'End Date',
            'Total Projects',
            'Total Allocated',
            'Total Disbursed',
            'Remaining Balance',
        ];
    }

    public function map($budget): array
    {
        $totalProjects = $budget->projects->count();
        $totalAllocated = $budget->projects->sum('total_budget');
        $totalDisbursed = $budget->projects->flatMap->disbursements->sum('disbursed_amount');
        $remainingBalance = $budget->total_amount - $totalDisbursed;

        return [
            $budget->budget_id,
            $budget->name,
            $budget->total_amount,
            $budget->start_date,
            $budget->end_date,
            $totalProjects,
            $totalAllocated,
            $totalDisbursed,
            $remainingBalance,
        ];
    }
}