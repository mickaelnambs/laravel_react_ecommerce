<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Traits\UploadFile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateProfileRequest;

class UserController extends Controller
{
    use UploadFile;

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        return response()->json([
            'message' => 'Account created successfully',
            'user' => UserResource::make($user)
        ]);
    }

    public function auth(AuthUserRequest $request): JsonResponse
    {
        $user = User::whereEmail($request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'user' => UserResource::make($user),
            'access_token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $userData = $request->validated();

        if ($request->hasFile('profile_image')) {
            $this->removeFile($user->profile_image);
            $userData['profile_image'] = $this->saveImage($request->file('profile_image'), 'users');
        }

        $userData['profile_completed'] = true;
        $user->update($userData);

        return response()->json([
            'message' => $request->hasFile('profile_image')
                ? 'Profile image updated successfully'
                : 'Profile updated successfully',
            'user' => UserResource::make($user)
        ]);
    }
}
