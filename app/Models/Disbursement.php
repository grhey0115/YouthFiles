<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Filament\Notifications\Notification;

class Disbursement extends Model
{
    use HasFactory;

    // Fillable fields to allow mass assignment
    protected $fillable = [
        'budget_id',
        'recipient_name',
        'disbursed_amount',
        'disbursement_date',
        'attached_document',
        'payment_method',
        'reference_number',
        'status',
        'project_id',
        'disbursement_no', // Add the new disbursement number
        'procurements',    // Add the procurements field (assuming this is stored as JSON or text)
        'remarks',         // Optionally add the remarks field
    ];

    // Relationship to the Budget
    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }

    // Relationship to Procurements (if you have a pivot table for procurements)
    public function procurements()
    {
        return $this->belongsToMany(Procurement::class, 'disbursement_procurement');
    }

    // Relationship to the Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Validation or business logic before saving a disbursement
   /* protected static function booted()
    {
        static::saving(function ($disbursement) {
            $project = $disbursement->project;
    
            // Check if the project has sufficient remaining budget
            if ($project && $disbursement->disbursed_amount > $project->remaining_budget) {
                // Show a notification for budget exceeded
                Notification::make()
                    ->title('Error')
                    ->danger()
                    ->body('Disbursed amount exceeds the available project budget.')
                    ->send();
    
                return false;  // Stop the saving process
            }
        });
    }*/

    // Additional functions if you want to handle JSON decode/encode for procurements
    public function setProcurementsAttribute($value)
    {
        $this->attributes['procurements'] = json_encode($value);
    }

    public function getProcurementsAttribute($value)
    {
        return json_decode($value, true);
    }
}
