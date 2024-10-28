<?php

namespace App\Filament\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AssistanceApplicantExporter implements FromCollection, WithHeadings
{
    protected $applicants;

    public function __construct(Collection $applicants)
    {
        $this->applicants = $applicants;
    }

    public function collection()
    {
        return $this->applicants->map(function ($applicant) {
            return [
                'Applicant Name' => $applicant->user->last_name . ', ' . $applicant->user->first_name,
                'Status' => $applicant->status,
                'Aid Received' => $applicant->aid_received,
                'Payment Method' => $applicant->payment_method,
                'Payment Status' => $applicant->payment_status,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Applicant Name',
            'Status',
            'Aid Received',
            'Payment Method',
            'Payment Status',
        ];
    }
}
