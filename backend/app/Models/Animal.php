<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'nom',
        'espece',
        'race',
        'date_naissance',
        'sexe',
        'numero_identification',
    ];

    protected $casts = [
        'date_naissance' => 'date',
    ];

    // Relationship: An animal belongs to one owner
    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    // Relationship: An animal can have many consultations
    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    // Helper method to calculate age
    public function getAge(): int
    {
        return Carbon::parse($this->date_naissance)->age;
    }
}
