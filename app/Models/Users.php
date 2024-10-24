<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use BezhanSalleh\FilamentShield\Traits\HasPanelShield;
use Filament\Models\Contracts\FilamentUser;

class Users extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles, HasPanelShield;

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
        'avatar',
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
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function getNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
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
    public function getAvatarUrlAttribute()
    {
        return $this->avatar
            ? Storage::url($this->avatar)
            : 'https://via.placeholder.com/150'; // Default placeholder image
    }
}
