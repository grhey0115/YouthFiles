<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'background_image',
    ];

    public function signatures()
    {
        return $this->hasMany(CertificateSignature::class);
    }
}