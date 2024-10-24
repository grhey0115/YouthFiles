<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcements extends Model
{
    use HasFactory;

    protected $table = 'announcements';
    protected $fillable = [
        'title',
        'message',
        'published_at',
    ];
    protected $dates = [
        'published_at',
        'created_at',
        'updated_at',
    ];
}
