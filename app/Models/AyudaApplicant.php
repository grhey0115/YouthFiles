<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AyudaApplicant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ayuda_id',
        'status',
        'notified_at',
        'compliance_status',
        'payment_method',
        'payment_status',
        'aid_received',
        'distribution_tracking',
        'full_name',            
        'applied_at',            
        'assistance_received',   
    ];

    protected $casts = [
        'notified_at' => 'datetime',
        'applied_at' => 'datetime', // Cast applied_at to datetime
    ];

    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
    public function history()
    {
        return $this->hasMany(AyudaApplicantHistory::class);
    }
    public function files()
    {
        return $this->hasMany(AyudaApplicantFile::class, 'ayuda_applicant_id');
    }
    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
  
   
}
