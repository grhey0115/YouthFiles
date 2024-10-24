<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AyudaApplicantFile extends Model
{
    use HasFactory;

    protected $fillable = ['ayuda_applicant_id',
                            'requirement_id',
                            'file_path', 
                            'file_type'];

     public function applicant()
    {
        return $this->belongsTo(AyudaApplicant::class);
    }
    public function requirement()
    {
        return $this->belongsTo(Requirement::class, 'requirement_id');
    }
}
