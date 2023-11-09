<?php

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('conversation.{conversationId}', function (User $user, int $conversationId) {
    Log::info('Authenticated User:', ['user' => $user]);
    return Conversation::find($conversationId)->id === $user->conversations()->where('conversation_id', $conversationId)->first()->id;
});
