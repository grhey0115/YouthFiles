<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertificateSignature extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_id',
        'name',
        'role',
        'signature_image',
    ];

    public function certificate()
    {
        return $this->belongsTo(Certificate::class);
    }
}