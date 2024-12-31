<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\PersonalInformation;
use App\Models\EducationalBackground;
use Spatie\Permission\Traits\HasRoles;
use App\Models\EmergencyContact;

class Youth extends Model
{
    use HasRoles;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
        'email',
        'password',
        'youth_points',
        'avatar',
        'account_status',
        'verification_steps',
        'verified_at',
        'rejection_reason',
        'profile_completed',
        'approval_status',
        'approved_at',
    ];
    
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