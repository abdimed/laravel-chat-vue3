<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(RegisterUserRequest $request)
    {
        $user = User::create($request->validated());

        return response()->json(UserResource::make($user));
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $authToken = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => UserResource::make($user),
            'authToken' => $authToken,
        ]);

    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            // Revoke all of the user's tokens
            $user->tokens->each(function ($token) {
                $token->delete();
            });

            // Optionally, you can clear any user-related data or perform additional cleanup

            return response()->json(['message' => 'Logged out successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
