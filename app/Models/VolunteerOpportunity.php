<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VolunteerOpportunity extends Model
{
    protected $fillable = [
        'ayuda_id', 
        'role_title', 
        'slots', 
        'description', 
        'start_date', 
        'end_date', 
        'requirements', 
        'is_active',
    ];

    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
    public function volunteerApplications()
    {
        return $this->hasMany(VolunteerApplication::class);
    }

    public function acceptedVolunteers()
    {
        return $this->hasMany(AcceptedVolunteer::class);
    }
}