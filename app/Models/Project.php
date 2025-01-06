<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Carbon\carbon;

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
        'status',
        'remaining_budget',
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
        // Calculate the remaining budget by subtracting only approved disbursements
        $totalApprovedDisbursed = $this->disbursements()
            ->where('status', 'approved')
            ->sum('disbursed_amount');

        return $this->total_budget - $totalApprovedDisbursed;
    }

    public function getTotalApprovedDisbursedAttribute()
    {
        // Calculate the total disbursed amount for approved disbursements
        return $this->disbursements()
            ->where('status', 'approved')
            ->sum('disbursed_amount');
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

    public function getProjectDurationAttribute()
    {
        return Carbon::parse($this->start_date)->diffInDays(Carbon::parse($this->end_date)) . ' days';
    }
    /*
    public function getStatusAttribute()
    {
        $now = Carbon::now();
        $start = Carbon::parse($this->start_date);
        $end = Carbon::parse($this->end_date);

        if ($now->lt($start)) {
            return 'Upcoming';
        } elseif ($now->between($start, $end)) {
            return 'Ongoing';
        } elseif ($now->gt($end)) {
            return 'Completed';
        }
        
        return 'Unknown';
    }*/

    public function getProgressAttribute()
    {
        // Time-based progress
        $timeProgress = $this->getTimeProgress();
        
        // Budget utilization progress
        $budgetProgress = $this->getBudgetProgress();
        
        // Disbursement progress
        $disbursementProgress = $this->getDisbursementProgress();
        
        // You can adjust the weights based on your preference
        $weightedProgress = ($timeProgress * 0.3) + ($budgetProgress * 0.4) + ($disbursementProgress * 0.3);
        
        return round($weightedProgress, 2);
    }

    private function getTimeProgress()
    {
        $startDate = Carbon::parse($this->start_date);
        $endDate = Carbon::parse($this->end_date);
        $now = Carbon::now();

        if ($now->lt($startDate)) {
            return 0;
        }

        if ($now->gt($endDate)) {
            return 100;
        }

        $totalDuration = $startDate->diffInDays($endDate);
        $elapsedDuration = $startDate->diffInDays($now);

        return ($elapsedDuration / $totalDuration) * 100;
    }

    private function getBudgetProgress()
    {
        if ($this->total_budget <= 0) {
            return 0;
        }

        $usedBudget = $this->total_budget - $this->remaining_budget;
        return ($usedBudget / $this->total_budget) * 100;
    }

    private function getDisbursementProgress()
    {
        if ($this->total_budget <= 0) {
            return 0;
        }

        $approvedDisbursements = $this->disbursements()
            ->where('status', 'approved')
            ->sum('disbursed_amount');

        return ($approvedDisbursements / $this->total_budget) * 100;
    }

    
    
   
}
