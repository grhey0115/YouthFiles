<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalInformation extends Model
{
    use HasFactory;
    public function user()
{
    return $this->belongsTo(User::class);
}
protected $fillable = [
    'user_id',
    'is_currently_working',
    'hobbies',
    'is_pwd',
    'has_conflict_with_law',
    'is_indigenous',
    'is_registered_voter',
    'attended_assembly',
    'why_no_assembly',
    'residency_status',
];
protected $casts = [
    'hobbies' => 'array',
];

// Define the default values for the attributes
protected $attributes = [
    'is_currently_working' => '0',
    'is_pwd' => '0',
    'has_conflict_with_law' => '0',
    'is_indigenous' => '0',
    'is_registered_voter' => '0',
    'attended_assembly' => '0',
];

// Add validation rules in a form request or directly in the controller
public static function rules()
{
    return [
        'is_currently_working' => 'required|in:0,1',
        'hobbies' => 'nullable|array',
        'is_pwd' => 'required|in:0,1',
        'has_conflict_with_law' => 'required|in:0,1',
        'is_indigenous' => 'required|in:0,1',
        'is_registered_voter' => 'required|in:0,1',
        'attended_assembly' => 'required|in:0,1',
        'why_no_assembly' => 'nullable|string',
        'residency_status' => 'required|in:Permanent,Temporary',
    ];
}


}
