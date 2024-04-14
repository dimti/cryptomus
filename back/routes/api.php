<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

Route::group([
    'middleware' => 'auth:sanctum',
], function() {
    Route::get('/users', [App\Http\Controllers\Users::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\Users::class, 'show'])->scopeBindings();
    Route::put('/users/{user}', [App\Http\Controllers\Users::class, 'update'])->scopeBindings();
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', function (Request $request) {
    $request->validate([
        'username' => 'required',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->username)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return [
        'id' => $user->id,
        'access_token' => $user->createToken('front')->plainTextToken,
        "expires_in" => $ttl = intval(env('JWT_TTL', 10200)),
        'exp' => $exp = (time() + $ttl * 60),
        'accessTokenExpires' => $exp * 1000,
        'name' => $user->email,
    ];
});

Route::post('/logout', function (Request $request) {
    $request->user()?->currentAccessToken()->delete();
});
