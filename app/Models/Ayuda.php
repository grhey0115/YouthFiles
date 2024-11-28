<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class Ayuda extends Model
{
    use HasFactory;

    protected $fillable = [
        'header',                 // Header image
        'title',                  // Title of the assistance program
        'description',            // Program description
        'sector',                 // Sector (e.g., Education, Health)
        'filter',                 // Eligibility filter
        'date_start',             // Start date
        'date_end', 
        'assistance_date',              // End date
        'max_beneficiaries', 
        'official_in_charge',
        'current_beneficiaries',      // Maximum number of beneficiaries
        'disbursement_method',     // Method of disbursement (e.g., cash, bank transfer)
        'assistance_type',         // Type of assistance (e.g., cash, education, livelihood)
        'status',                 // Status (e.g., Open, In Progress, Closed)
        'requirements_needed',    // Whether requirements are needed (yes/no)
        'requirements_file',
        'needs_donations',
        'needs_volunteers',      // Path to the file for required documents
    ];
    protected $casts = [
        'filter' => 'array',
        'official_in_charge' => 'array',
        'date_start' => 'datetime',
        'date_end' => 'datetime',
        'needs_donations' => 'boolean',
        'needs_volunteers' => 'boolean',
        'assistance_type' => 'array',
    ];


    // Define the many-to-many relationship with the User model for SK Officials
    public function officialsInCharge()
    {
        return $this->belongsToMany(User::class, 'ayuda_officials_in_charge')->withTimestamps();
    }

    // Define the many-to-many relationship with the User model
    public function users()
    {
        return $this->belongsToMany(User::class, 'ayuda_applicants')->withPivot('applied');
    }

    // Define the one-to-many relationship with the AyudaApplicant model
    public function applicants()
    {
        return $this->hasMany(AyudaApplicant::class, 'ayuda_id');
    }

    // Generate a QR code for the Ayuda instance
    public function generateQrCode(User $user)
    {
        if (!$this->id) {
            throw new \Exception("Ayuda ID is not set.");
        }

        // Generate the URL with the required parameters
        $url = route('ayuda.show', ['id' => $this->id]);

        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($url);
    }
    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }
    

    public function volunteerOpportunities()
    {
        return $this->hasMany(VolunteerOpportunity::class);
    }
    public function volunteerApplications()
    {
        return $this->hasMany(VolunteerApplication::class);
    }
    // Computed attribute for total amount raised
    public function getTotalAmountRaisedAttribute(): int
    {
        return $this->donations()->sum('amount');
    }
    public function userDonations()
    {
        return $this->hasMany(UserDonation::class);
    }
    public function acceptedVolunteers()
    {
        return $this->hasMany(AcceptedVolunteer::class);
    }
    public function donations()
    {
        return $this->hasMany(Donation::class, 'ayuda_id');
    }

    
}
