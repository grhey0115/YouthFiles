<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'total_budget',
        'header_image',
        'budget_id',
    ];

    public function disbursements()
    {
        return $this->hasMany(Disbursement::class);
    }
    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }
 
    // Relationship with Procurements
    public function procurements()
    {
        return $this->hasMany(Procurement::class); 
    }
    // Relationship with Disbursements
    public function getRemainingBudgetAttribute()
    {
        // Calculate the remaining budget by subtracting the total disbursed amount from the total project budget
        $totalDisbursed = $this->disbursements()->sum('disbursed_amount');

        return $this->total_budget - $totalDisbursed;
    }
    protected static function booted()
    {
        // Update the remaining amount after a project is created
        static::created(function ($project) {
            $project->budget->updateRemainingAmount();
        });

        // Update the remaining amount after a project is updated
        static::updated(function ($project) {
            $project->budget->updateRemainingAmount();
        });

        // Update the remaining amount after a project is deleted
        static::deleted(function ($project) {
            $project->budget->updateRemainingAmount();
        });
    }
    public function saveProject(Project $project)
    {
        $project->save();

        // Refresh the budget's remaining amount
        $project->budget->refresh();
    }

   /* public function getRemainingBudgetAttribute()
    {
        return $this->total_budget - $this->disbursements()->where('status', 'approved')->sum('disbursed_amount');
    }*/

    
    
   
}
