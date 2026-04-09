<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OwnerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_owner_without_veterinarian_id(): void
    {
        $admin = User::factory()->admin()->create();

        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/owners', [
            'fullName' => 'John Owner',
            'telephone' => '0600000000',
            'email' => 'john.owner@example.com',
            'adresse' => '123 Main Street',
            'ville' => 'Casablanca',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('owner.fullName', 'John Owner')
            ->assertJsonPath('owner.veterinarian_id', null);

        $this->assertDatabaseHas('owners', [
            'fullName' => 'John Owner',
            'veterinarian_id' => null,
        ]);
    }
}
