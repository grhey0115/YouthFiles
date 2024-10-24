<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\PersonalInformation;
use App\Models\EducationalBackground;
use App\Models\EmergencyContact;

class Youth extends Model
{
    protected $table = 'users'; // Use the 'users' table as the base for youth data

    public function personalInformation()
    {
        return $this->hasOne(PersonalInformation::class, 'user_id', 'id');
    }

    public function educationalBackground()
    {
        return $this->hasOne(EducationalBackground::class, 'user_id', 'id');
    }

    public function emergencyContact()
    {
        return $this->hasOne(EmergencyContact::class, 'user_id', 'id');
    }
}