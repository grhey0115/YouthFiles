<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;
    
    public function user()
{
    return $this->belongsTo(User::class);
}

protected $fillable = [
    'user_id',
    'barangay',
    'sitio',
    'religion',
    'date_of_birth',
    'age',
    'civil_status',
    'is_solo_parent',
    'gender',
    'family_members',
    'siblings',
    'valid_id_path',
];

}
