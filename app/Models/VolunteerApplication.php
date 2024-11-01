<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VolunteerApplication extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'volunteer_opportunity_id',
        'ayuda_id', // Add this
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function volunteerOpportunity()
    {
        return $this->belongsTo(VolunteerOpportunity::class);
    }

    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
}