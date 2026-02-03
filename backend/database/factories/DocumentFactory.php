<?php

namespace Database\Factories;

use App\Models\Consultation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['pdf', 'jpg', 'jpeg', 'png'];
        $type = fake()->randomElement($types);

        return [
            'consultation_id' => Consultation::factory(),
            'nom_fichier' => fake()->word() . '.' . $type,
            'chemin' => 'documents/' . fake()->sha1() . '.' . $type,
            'type' => $type,
            'taille' => fake()->numberBetween(10000, 5000000), // 10KB to 5MB
            'notes' => fake()->sentence(),
        ];
    }
}
