<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;

    protected $fillable = [
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
}
