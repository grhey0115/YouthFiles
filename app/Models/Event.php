<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [ 
        'name',
        'description',
        'start_time',
        'end_time',
        'location',        
        'youth_points',    
        'registration_fee',
        'slots',
        'header_image',
        'qr_code_image',
        'cancellation_days_before',
        'status',
        'type',
        'category',
        'event_date',
        // New Certificate Configuration Fields
        'enable_certificates',
        'certificate_theme',
        'certificate_primary_color',
        'certificate_secondary_color',
        'certificate_orientation',
        'certificate_paper_size'
    ];

    // Set default values
    protected $attributes = [
        'status' => 'draft',
        'cancellation_days_before' => 3,
        'enable_certificates' => false,
        'certificate_theme' => 'default',
        'certificate_orientation' => 'landscape',
        'certificate_paper_size' => 'a4'
    ];

    // Existing relationships
    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user')->withPivot('attendance_status');
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function pendingPayments()
    {
        return $this->hasMany(Payment::class)->where('status', 'pending');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // Certificate-related relationships and methods
    public function certificateSignatories()
    {
        return $this->hasMany(EventCertificateSignatory::class);
    }

    // Comprehensive certificate configuration accessor
    public function getCertificateConfigurationAttribute()
    {
        return [
            'enabled' => $this->enable_certificates,
            'theme' => $this->certificate_theme,
            'primary_color' => $this->certificate_primary_color,
            'secondary_color' => $this->certificate_secondary_color,
            'orientation' => $this->certificate_orientation,
            'paper_size' => $this->certificate_paper_size,
            'signatories' => $this->certificateSignatories
        ];
    }

    // Method to check if certificates are enabled
    public function areCertificatesEnabled()
    {
        return $this->enable_certificates === true;
    }

    // Method to generate certificate (placeholder - implement your logic)
    public function generateCertificate(User $user)
    {
        if (!$this->areCertificatesEnabled()) {
            return null;
        }

        // Implement certificate generation logic
        // This could involve:
        // 1. Checking user's participation
        // 2. Generating PDF with event and user details
        // 3. Adding signatories
        // 4. Applying selected theme and colors
    }

    // Existing methods
    public function generateQrCode(User $user)
    {
        $url = route('events.attendance', ['event' => $this->id, 'user' => $user->id]);

        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($url);
    }

    public function isFull()
    {
        $confirmedUsers = $this->users()->count();
        $pendingPaymentsCount = $this->pendingPayments()->count();
        $totalReservations = $confirmedUsers + $pendingPaymentsCount;

        return $totalReservations >= $this->slots;
    }

    public function getCurrentParticipantsAttribute()
    {
        return $this->users()->count();
    }

    public function getAvailableSlotsAttribute()
    {
        $confirmedUsers = $this->users()->count();
        $pendingPaymentsCount = $this->pendingPayments()->count();

        $availableSlots = $this->slots - ($confirmedUsers + $pendingPaymentsCount);

        return max(0, $availableSlots);
    }
    protected $appends = ['available_slots'];
    // Scopes for filtering
    public function scopeWithCertificates($query)
    {
        return $query->where('enable_certificates', true);
    }

    public function scopeByTheme($query, $theme)
    {
        return $query->where('certificate_theme', $theme);
    }
}