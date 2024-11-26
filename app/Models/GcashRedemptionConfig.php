<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GcashRedemptionConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'points_required',
        'gcash_amount',
        'is_active',
        'maximum_redemptions_per_month'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Validation method
    public static function validateRedemption($points)
    {
        $config = self::where('points_required', $points)->first();

        if (!$config || !$config->is_active) {
            return [
                'valid' => false,
                'message' => 'Invalid redemption configuration'
            ];
        }

        return [
            'valid' => true,
            'config' => $config
        ];
    }
}