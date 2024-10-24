<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalBackground extends Model
{
    use HasFactory;
    public function user()
{
    return $this->belongsTo(User::class);
}

protected $fillable = [
    'user_id',
    'current_status',
    'last_year_attended',
    'year_graduated',
    'year_level',
    'course',

];

}
