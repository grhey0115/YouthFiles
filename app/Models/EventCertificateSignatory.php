<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventCertificateSignatory extends Model
{
    protected $table = 'event_certificate_signatories';

    protected $fillable = [
        'event_id',
        'name',
        'role',
        'signature_path'
    ];

    // Relationship with Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}