<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PointsRedemption extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'points_redeemed',
        'gcash_amount',
        'gcash_name',
        'gcash_number',
        'status',
        'remarks',
        'transaction_reference'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['status'] ?? null, function ($query, $status) {
            return $query->where('status', $status);
        });
    }

    // Static method for points conversion rates
    public static function getConversionRates()
    {
        return [
            1000 => 50,
            2500 => 125,
            5000 => 250,
            10000 => 500
        ];
    }

    // Mutators and Accessors
    public function getFormattedAmountAttribute()
    {
        return number_format($this->gcash_amount, 2);
    }

    // Generate unique transaction reference
    public static function generateTransactionReference()
    {
        return 'PR-' . strtoupper(uniqid());
    }
}