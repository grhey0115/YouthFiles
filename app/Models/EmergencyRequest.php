<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmergencyRequest extends Model
{
    protected $fillable = [
        'user_id',
        'contact_number',
        'assistance_type',
        'description',
        'supporting_document',
        'status',
        'admin_notes',
        'resolved_at'
    ];

    protected $casts = [
        'resolved_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scope for different statuses
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    // Mutator for supporting document
    public function setSupportingDocumentAttribute($value)
    {
        if ($value) {
            $path = $value->store('emergency_documents', 'public');
            $this->attributes['supporting_document'] = $path;
        }
    }
}