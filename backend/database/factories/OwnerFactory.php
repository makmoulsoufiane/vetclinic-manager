<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Owner>
 */
class OwnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'veterinarian_id' => User::factory()->veterinarian(),
            'fullName' => fake()->name(),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'adresse' => fake()->streetAddress(),
            'ville' => fake()->city(),
        ];
    }
}
