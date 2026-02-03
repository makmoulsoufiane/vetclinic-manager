<?php

namespace Database\Factories;

use App\Models\Owner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $especes = ['Chien', 'Chat', 'Oiseau', 'Lapin', 'Hamster', 'Tortue', 'Poisson'];
        $races = [
            'Chien' => ['Labrador', 'Golden Retriever', 'Berger Allemand', 'Beagle', 'Poodle'],
            'Chat' => ['Persan', 'Siamois', 'Maine Coon', 'Chartreux', 'Bengal'],
            'Oiseau' => ['Perroquet', 'Canari', 'Perruche', 'Pigeon'],
            'Lapin' => ['Angora', 'Bélier', 'Blanc de Hotot'],
            'Hamster' => ['Syrien', 'Russe', 'Roborovski'],
            'Tortue' => ['Terrestre', 'Aquatique'],
            'Poisson' => ['Poisson Rouge', 'Guppy', 'Combattant'],
        ];

        $espece = fake()->randomElement($especes);

        return [
            'nom' => fake()->firstName(),
            'espece' => $espece,
            'race' => fake()->randomElement($races[$espece]),
            'date_naissance' => fake()->dateTimeBetween('-15 years', '-1 months'),
            'sexe' => fake()->randomElement(['male', 'female']),
            'numero_identification' => fake()->unique()->numerify('###########'),
            'owner_id' => Owner::factory(),
        ];
    }
}
