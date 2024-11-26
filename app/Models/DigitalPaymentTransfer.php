<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DigitalPaymentTransfer extends Model
{
    protected $fillable = [
        'user_id', 
        'amount', 
        'payment_type', 
        'payment_method', 
        'reference_number',
        'recipient_account', 
        'status', 
        'purpose', 
        'admin_notes',
        'supporting_documents',
        'transaction_date'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'datetime',
        'supporting_documents' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Mutator for supporting documents
    public function setSupportingDocumentsAttribute($value)
    {
        $this->attributes['supporting_documents'] = json_encode(
            collect($value)->map(function ($file) {
                return $file->store('payment_documents', 'public');
            })
        );
    }
}