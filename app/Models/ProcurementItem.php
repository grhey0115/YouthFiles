<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcurementItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'procurement_id',  
        'description',     
        'quantity',        
        'unit',          
        'unit_cost',      
        'total_cost',    
    ];

    // Define relationship with ProcurementItem
    public function procurementItems()
    {
        return $this->hasMany(ProcurementItem::class);
    }
    public function procurement()
    {
        return $this->belongsTo(Procurement::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
