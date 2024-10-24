<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'event_id',
        'reference_number',
        'receipt_image',
        'amount',
        'status',
    ];

    // Each payment belongs to one user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Each payment belongs to one event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
