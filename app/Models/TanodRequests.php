<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanodRequests extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contact',
        'details',
        'request_letter',
        'place',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}