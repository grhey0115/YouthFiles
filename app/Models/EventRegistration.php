<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    // Define the table if it's not plural of the model name
    protected $table = 'event_registrations';

    // Define which fields can be mass assigned
    protected $fillable = [
        'event_id',
        'user_id',
        'reference_number',
        'receipt_image',
    ];

    // Relationships

    // Each registration belongs to one event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Each registration belongs to one user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
