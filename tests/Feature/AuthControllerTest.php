<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanLogin()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['user', 'token']);
    }

    // public function testUserCanLogout()
    // {
    //     Sanctum::actingAs(User::factory()->create());

    //     $response = $this->postJson('/api/disconnect');

    //     $response->assertStatus(200)
    //         ->assertJson(['message' => 'Disconnected successfully']);
    // }
}
