<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDonation extends Model
{
    protected $fillable = [
        'user_id',
        'donation_id',
        'donation_type',
        'amount',
        'quantity',
        'description',
        'estimated_value',
        'reference_number',
        'status',
        'receipt_image',
        'ayuda_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }

    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
}