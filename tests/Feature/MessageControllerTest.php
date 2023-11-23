<?php

namespace Tests\Feature;

// use App\Events\NewMessage;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MessageControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    // public function test_authentidied_users_can_send_message()
    // {
    //     $sender = User::factory()->create();
    //     // $receiver = User::factory()->create();
    //     Event::fake();
    //     $conversation = Conversation::factory()->create();

    //     // Sanctum::actingAs($sender);

    //     // $response = $this->postJson('api/messages', [
    //     //     'sender_id' => $sender->id,
    //     //     'receiver_id' => $receiver->id,
    //     //     'body' => 'this is a test messagzzze'
    //     // ]);

    //     // $response->assertOk()
    //     //     ->assertJsonStructure(['sender', 'receiver', 'body']);

    //     $message = Message::factory()
    //         ->for($sender)
    //         ->for($conversation)
    //         ->create();
    //     NewMessage::dispatch($message);
    //     Event::assertDispatched(NewMessage::class);
    // }
}
