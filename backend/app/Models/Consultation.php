<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'user_id',
        'date_consultation',
        'motif',
        'diagnostic',
        'traitement',
        'notes',
    ];

    protected $casts = [
        'date_consultation' => 'datetime',
    ];

    // Relationship: A consultation belongs to one animal
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    // Relationship: A consultation belongs to one user (veterinarian)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: A consultation can have many documents
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
