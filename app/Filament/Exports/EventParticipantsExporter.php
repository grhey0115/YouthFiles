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
                'Full Name' => "{$participant->last_name}, {$participant->first_name} {$participant->middle_name}", // Format LastName, FirstName MiddleName
                'Email Address' => $participant->email,
                'Status of Attendance' => $participant->pivot->attendance_status,
                'Status of Attendance' => $participant->pivot->attendance_status,
            ];
        });
    }

    public function headings(): array
    {
        return ['Full Name', 'Email Address', 'Status of Attendance'];
    }
}
