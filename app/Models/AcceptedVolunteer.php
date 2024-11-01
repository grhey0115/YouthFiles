<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcceptedVolunteer extends Model
{
    protected $fillable = [
        'user_id',
        'volunteer_opportunity_id',
        'ayuda_id', // Add this
        'accepted_on',
        'is_volunteered',
    ];

    protected $casts = [
        'accepted_on' => 'datetime',
        'is_volunteered' => 'boolean',
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