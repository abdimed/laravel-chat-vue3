<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sender = User::factory()->create([
            'name' => 'sender',
            'email' => 'sender@ichat.com',
            'password' => Hash::make('123')
        ]);

        $receiver = User::factory()->create([
            'name' => 'receiver',
            'email' => 'receiver@ichat.com',
            'password' => Hash::make('123')
        ]);

        $conversations = Conversation::factory()->count(2)->create();

        foreach ($conversations as $conversation) {
            $conversation->users()->attach([$sender->id, $receiver->id]);

            Message::factory()
                ->for($sender)
                ->for($conversation)
                ->count(5)
                ->create();

            Message::factory()
                ->for($receiver)
                ->for($conversation)
                ->count(5)
                ->create();
        }
    }
}
