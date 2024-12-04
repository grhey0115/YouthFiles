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
    'front_id',
    'back_id',
];
protected $casts = [  
    
 ];
 protected $guarded = [];

  // Add accessors for file URLs
  public function getFrontIdUrlAttribute()
  {
      return $this->front_id ? Storage::disk('public')->url($this->front_id) : null;
  }

  public function getBackIdUrlAttribute()
  {
      return $this->back_id ? Storage::disk('public')->url($this->back_id) : null;
  }

}
