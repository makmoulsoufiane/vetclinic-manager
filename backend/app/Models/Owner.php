<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;

    protected $fillable = [
        'veterinarian_id',
        'fullName',
        'telephone',
        'email',
        'adresse',
        'ville',
    ];

    // Relationship: An owner can have many animals
    public function animals()
    {
        return $this->hasMany(Animal::class);
    }

    public function veterinarian()
    {
        return $this->belongsTo(User::class, 'veterinarian_id');
    }
}
