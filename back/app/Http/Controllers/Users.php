<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class Users extends Controller
{
    public function index(): JsonResponse
    {
        return fractal(User::all(), UserTransformer::class)->respond();
    }

    public function show(User $user): JsonResponse
    {
        return fractal($user, UserTransformer::class)->respond();
    }

    public function update(User $user, Request $request): JsonResponse
    {
        $request->validate([
            'username' => [
                'required',
                Rule::unique(User::class)->ignore($user->id),
            ],
        ]);

        $user->fill([
            'email' => $request->input('username'),
        ])->save();

        return fractal($user, UserTransformer::class)->respond();
    }
}
