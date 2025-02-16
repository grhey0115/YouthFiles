<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Budget extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'description', 
        'total_amount', 
        'remaining_amount', 
        'start_date', 
        'end_date', 
        'created_by',
        'budget_id',
        'contingency_percentage',
        'contingency_amount',
        'duration',
        'total_allocated',
        'funding_source',
        'status',


    ];

    protected static function boot()
{
    parent::boot();

    static::creating(function ($model) {
        $model->remaining_amount = $model->remaining_amount ?? $model->total_amount;
    });

    static::updating(function ($model) {
        if (is_null($model->remaining_amount)) {
            $model->remaining_amount = $model->total_amount;
        }
    });
}


    public function procurements()
    {
        return $this->hasMany(Procurement::class);
    }
    public function updateRemainingAmount()
    {
        // Sum all total_budget values from associated projects
        $totalAllocatedToProjects = $this->projects()->sum('total_budget');
        
        // Calculate the remaining amount
        $this->remaining_amount = $this->total_amount - $totalAllocatedToProjects;
    
        // Save the updated remaining_amount to the database
        $this->save();
    }

    // Relationship with projects
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function disbursements()
    {
        return $this->hasMany(Disbursement::class);
    }

    protected static function booted()
    {
        static::creating(function ($budget) {
            $budget->created_by = Auth::id(); // Set the currently authenticated user's ID
        });
    }
}
