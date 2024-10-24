<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AyudaApplicantHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ayuda_applicant_id',
        'ayuda_id',
        'ayuda_title',    // Include Ayuda title here
        'status',
        'aid_received',
        'payment_method',
        'payment_status',
        'received_at',
    ];

    protected $casts = [
        'received_at' => 'datetime',
    ];

    /**
     * Relationship to the AyudaApplicant model.
     */
    public function ayudaApplicant()
    {
        return $this->belongsTo(AyudaApplicant::class);
    }

    /**
     * Relationship to the User model (applicant).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship to the User model (admin/staff who recorded the history).
     */
    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
