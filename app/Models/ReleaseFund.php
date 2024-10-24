<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReleaseFund extends Model
{
    use HasFactory;

    protected $fillable = [
        'budget_id',
        'requested_amount',
        'status', // pending, approved, disapproved
        'reason',
    ];

    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }

    // Relationship with Disbursements (optional, based on how it's used)
    public function disbursements()
    {
        return $this->hasMany(Disbursement::class);
    }
}
