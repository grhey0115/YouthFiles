<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [ 
    'name',
    'description',
    'start_time',
    'end_time',
    'location',        
    'youth_points',    
    'registration_fee',
    'slots',
    'header_image',
    'qr_code_image',
    'cancellation_days_before',
    'status',           // New: Track event status
    'type',             // New: Event type (e.g., seminar, workshop)
    'category'          // New: Event category (e.g., sports, outreach)
];

// Set default values for status and cancellation days
protected $attributes = [
    'status' => 'draft',  // Default to 'draft' when creating a new event
    'cancellation_days_before' => 3, // Default cancellation window is 3 days

    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
    public function generateQrCode(User $user)
    {
        $url = route('events.attendance', ['event' => $this->id, 'user' => $user->id]);

        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($url);
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }
   /* public function isFull()
    {
        $registeredUsersCount = $this->users()->count();
        return $registeredUsersCount >= $this->slots;
    }*/
    public function pendingPayments()
{
    return $this->hasMany(Payment::class)->where('status', 'pending');
}

public function isFull()
{
    $confirmedUsers = $this->users()->count();
    $pendingPaymentsCount = $this->pendingPayments()->count();
    $totalReservations = $confirmedUsers + $pendingPaymentsCount;

    return $totalReservations >= $this->slots;
}
public function getCurrentParticipantsAttribute()
{
    // Assuming there's a 'users' relationship that tracks event participants
    return $this->users()->count();
}
public function getAvailableSlotsAttribute()
{
    $confirmedUsers = $this->users()->count(); // Count confirmed users
    $pendingPaymentsCount = $this->pendingPayments()->count(); // Count pending payments

    // Subtract confirmed users and pending payments from total slots
    $availableSlots = $this->slots - ($confirmedUsers + $pendingPaymentsCount);

    // Ensure available slots never go below zero
    return max(0, $availableSlots);
}
public function payments()
{
    return $this->hasMany(Payment::class);
}

}
