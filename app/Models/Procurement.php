<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procurement extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'pr_no',                  // PR No. as the primary key
        'procurement_cost',        // Total procurement cost
        'procurement_date',        // Date of procurement
        'project_id',              // Foreign key to Project
        'purpose',                 // Purpose of the procurement
        'approval_status',         // Status of the approval process
        'procurement_officer',      // Array of procurement officers
        'remarks',  
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }
    public function disbursements()
    {
        return $this->belongsToMany(Disbursement::class, 'disbursement_procurement');
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function getBudgetAttribute()
    {
        return $this->project->budget;
    }
    public function procurementOfficer()
    {
        return $this->belongsTo(User::class, 'procurement_officer_id');
    }
        public function procurementItems()
    {
        return $this->hasMany(ProcurementItem::class);
    }
    
   
   

}
