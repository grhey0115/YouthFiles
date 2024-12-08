<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\HasName;
use BezhanSalleh\FilamentShield\Traits\HasPanelShield;
use Afsakar\FilamentOtpLogin\Models\Contracts\CanLoginDirectly;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail, CanLoginDirectly, HasName
{
    use HasFactory, Notifiable, HasRoles, HasPanelShield;


    // Verification Status Constants
    const STATUS_PENDING = 'pending';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_VERIFIED = 'verified';
    const STATUS_REJECTED = 'rejected';
    const STATUS_SUSPENDED = 'suspended';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'verified_at' => 'datetime',
        'verification_steps' => 'array',
        'profile_completed' => 'boolean',
    ];
    public function isVerified(): bool
    {
        return $this->account_status === self::STATUS_VERIFIED;
    }
    public function getVerificationProgress(): array
    {
        $requiredSteps = [
            'email_verified' => $this->hasVerifiedEmail(),
            'phone_verified' => $this->phone_number ? true : false,
            'profile_completed' => $this->isProfileComplete(),
            'personal_info' => $this->personalInformation()->exists(),
            'educational_background' => $this->educationalBackground()->exists(),
        ];

        $completedSteps = $this->verification_steps ?? [];
        $progress = array_merge($requiredSteps, $completedSteps);
        
        $completedCount = count(array_filter($progress));
        $totalSteps = count($requiredSteps);
        
        return [
            'percentage' => round(($completedCount / $totalSteps) * 100),
            'steps' => $progress
        ];
    }
    private function isProfileComplete(): bool
    {
        return !empty($this->first_name) && 
               !empty($this->last_name) && 
               !empty($this->email);
    }
    public function updateVerificationStatus(string $status, ?array $steps = null, ?string $rejectionReason = null)
    {
        $this->account_status = $status;
        
        if ($steps) {
            $this->verification_steps = $steps;
        }

        if ($status === self::STATUS_VERIFIED) {
            $this->verified_at = now();
        }

        if ($status === self::STATUS_REJECTED) {
            $this->rejection_reason = $rejectionReason;
        }

        $this->save();
    }
    public function getNameAttribute(): string
    {
        return $this->first_name;
    }
    public function canAccessFilament(): bool
{
    // Implement your logic to check if the user can access the Filament panel.
    return $this->hasRole('super_admin'); // Example logic: only super_admin can access
}

    public function personalInformation()
    {
        return $this->hasOne(PersonalInformation::class);
    }
    public function educationalBackground()
    {
        return $this->hasOne(EducationalBackground::class);
    }

    public function additionalInformation()
    {
        return $this->hasOne(AdditionalInformation::class);
    }

    public function emergencyContact()
    {
        return $this->hasOne(EmergencyContact::class);
    }
   

    public function ayudaApplications(): HasMany
    {
        return $this->hasMany(AyudaApplicant::class, 'user_id');
    }
    public function events()
    {
        return $this->belongsToMany(Event::class)->withPivot('attendance_status')->withTimestamps();
    }
    public function eventRegistrations()
    {
        return $this->hasMany(EventRegistration::class);
    }
    public function donations()
    {
        return $this->hasMany(UserDonation::class);
    }
    public function getFilamentName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function volunteerApplications()
    {
        return $this->hasMany(VolunteerApplication::class);
    }

    public function acceptedVolunteers()
    {
        return $this->hasMany(AcceptedVolunteer::class);
    }
    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_name} {$this->last_name}");
    }
    public function emergencyRequests()
    {
        return $this->hasMany(EmergencyRequest::class);
    }
    public function pointsRedemptions()
    {
        return $this->hasMany(PointsRedemption::class);
    }

    // Points management methods
    public function addYouthPoints($points)
    {
        $this->youth_points += $points;
        $this->save();
    }

    public function deductYouthPoints($points)
    {
        if ($this->youth_points >= $points) {
            $this->youth_points -= $points;
            $this->save();
            return true;
        }
        return false;
    }
    public function getAvatarUrlAttribute()
    {
        return $this->avatar 
            ? asset('storage/avatars/' . $this->avatar)
            : asset('/default_avatar1.png');
    }

    public function canLoginDirectly(): bool
    {
        return str($this->email)->endsWith('@email.com');
    }
   
}
