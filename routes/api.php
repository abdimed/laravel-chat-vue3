<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('conversations', ConversationController::class)->middleware('auth:sanctum');

Route::apiResource('messages', MessageController::class)->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(new UserResource($request->user()));
});

Route::middleware('auth:sanctum')->post('/messages/seen', function (Request $request) {
    $message = Message::findOrFail($request->messageId);

    $seenBy = $message->seen_by ;
    // if (!in_array($request->userId, $seenBy)) {
    //     $seenBy[] = $request->userId;
    // }
    // $message->update(['seen_by' => $seenBy]);
    return response()->json($seenBy);
});

Route::middleware('auth:sanctum')->get('/{id}/messages/unseen', function ($id) {
    return MessageResource::collection(User::find($id)->unseenMessages()->get());
});
