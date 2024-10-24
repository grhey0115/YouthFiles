<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmergencyContact extends Model
{
    use HasFactory;
    public function user()
{
    return $this->belongsTo(User::class);
}
protected $fillable = [
    'name', 
    'relationship', 
    'contact_number', 
    'address', 
    'user_id'
];
}
