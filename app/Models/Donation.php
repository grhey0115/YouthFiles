<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'ayuda_id', 'title', 'donation_type', 'goal', 'amount_raised', 'quantity', 
        'description', 'estimated_value', 'deadline', 'is_active','gcash_qr',
    ];

    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
    public function userDonations()
    {
        return $this->hasMany(UserDonation::class);
    }

}
