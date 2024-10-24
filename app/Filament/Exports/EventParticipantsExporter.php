<?php

namespace App\Filament\Exports;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EventParticipantsExporter implements FromCollection, WithHeadings
{
    protected Collection $users;

    public function __construct(Collection $users)
    {
        $this->users = $users;
    }

    public function collection()
    {
        return $this->users->map(function ($user) {
            return [
                'name' => $user->name,
                'email' => $user->email,
                'attendance_status' => $user->pivot->attendance_status,
                'joined_at' => $user->created_at->format('Y-m-d'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Participant Name',
            'Email',
            'Attendance Status',
            'Joined At',
        ];
    }
}
