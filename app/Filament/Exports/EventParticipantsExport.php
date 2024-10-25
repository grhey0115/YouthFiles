<?php

namespace App\Filament\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EventParticipantsExport implements FromCollection, WithHeadings
{
    protected $participants;

    public function __construct(Collection $participants)
    {
        $this->participants = $participants;
    }

    public function collection()
    {
        return $this->participants->map(function ($participant) {
            return [
                'Name' => $participant->name,
                'Email' => $participant->email,
                'Attendance Status' => $participant->pivot->attendance_status, // Adjust if necessary
            ];
        });
    }

    public function headings(): array
    {
        return ['Name', 'Email', 'Attendance Status'];
    }
}
