<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\Consultation;
use App\Models\Document;
use App\Models\Owner;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'fullName' => 'Admin User',
            'email' => 'admin@vetclinic.com',
        ]);

        // Create veterinarian users
        $doctor = User::factory()->veterinarian()->create([
            'fullName' => 'Dr. John Doe',
            'email' => 'doctor@vetclinic.com',
        ]);

        $sarah = User::factory()->veterinarian()->create([
            'fullName' => 'Dr. Sarah Smith',
            'email' => 'sarah@vetclinic.com',
        ]);

        // Create additional random veterinarians
        $veterinarians = User::factory(5)->veterinarian()->create();
        $veterinarians = collect([$doctor, $sarah])->merge($veterinarians);

        // Create owners with their animals and consultations
        Owner::factory(10)->create()->each(function (Owner $owner) use ($veterinarians) {
            if (!$owner->veterinarian_id) {
                $owner->update([
                    'veterinarian_id' => $veterinarians->random()->id,
                ]);
            }

            // Create 2-4 animals per owner
            Animal::factory(fake()->numberBetween(2, 4))->for($owner)->create()->each(function (Animal $animal) {
                // Create 1-5 consultations per animal
                Consultation::factory(fake()->numberBetween(1, 5))
                    ->for($animal)
                    ->create([
                        'user_id' => $animal->owner->veterinarian_id,
                    ])
                    ->each(function (Consultation $consultation) {
                    // Create 0-3 documents per consultation
                    Document::factory(fake()->numberBetween(0, 3))->for($consultation)->create();
                });
            });
        });
    }
}
