<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDevice extends Model
{
    protected $fillable = [
        'user_id',
        'user_agent',
        'ip_address',
        'otp',
        'otp_expires_at',
        'last_otp_sent_at',
        'is_verified'
    ];

    protected $casts = [
        'otp_expires_at' => 'datetime',
        'last_otp_sent_at' => 'datetime',
        'is_verified' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
