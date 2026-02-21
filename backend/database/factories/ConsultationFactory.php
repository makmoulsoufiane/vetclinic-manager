<?php

namespace Database\Factories;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consultation>
 */
class ConsultationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $motifs = [
            'Visite de routine',
            'Vaccin',
            'Problème digestif',
            'Problème respiratoire',
            'Infection',
            'Blessure',
            'Perte de poids',
            'Perte d\'appétit',
            'Suivi post-chirurgical',
            'Dermatose',
        ];

        $diagnostics = [
            'État de santé bon',
            'Légère inflammation',
            'Infection bactérienne',
            'Allergie',
            'Parasites',
            'Otite',
            'Gastro-entérite',
            'Dermatite',
        ];

        return [
            'animal_id' => Animal::factory(),
            'user_id' => User::factory()->veterinarian(),
            'date_consultation' => fake()->dateTimeBetween('-6 months', 'now'),
            'motif' => fake()->randomElement($motifs),
            'diagnostic' => fake()->randomElement($diagnostics),
            'traitement' => fake()->sentence(),
            'notes' => fake()->paragraph(),
        ];
    }
}
