<?php
// app/Models/Requirement.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    protected $fillable = ['ayuda_id', 'requirement_name', 'description'];

    public function ayuda()
    {
        return $this->belongsTo(Ayuda::class);
    }
}
