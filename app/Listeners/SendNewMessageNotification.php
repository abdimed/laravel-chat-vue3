<?php

namespace App\Listeners;

use App\Events\MessageSent;
use App\Notifications\NewMessageNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class SendNewMessageNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */

    public function handle(MessageSent $event): void
    {
        $usersInConversation = $event->message->conversation->users;

        $usersToNotify = $usersInConversation->reject(function ($user) {
            return $user->id === Auth::id();
        });

        Notification::send($usersToNotify, new NewMessageNotification($event->message));
    }
}
