<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'consultation_id',
        'nom_fichier',
        'chemin',
        'type',
        'taille',
        'notes',
    ];

    protected $casts = [
        'taille' => 'integer',
    ];

    // Relationship: A document belongs to one consultation
    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }

    // Helper method to get file URL
    public function getUrl(): string
    {
        return Storage::url($this->chemin);
    }

    // Helper method to check if document is an image
    public function isImage(): bool
    {
        return in_array(strtolower($this->type), ['jpg', 'jpeg', 'png', 'gif', 'webp']);
    }

    // Helper method to check if document is a PDF
    public function isPdf(): bool
    {
        return strtolower($this->type) === 'pdf';
    }
}
