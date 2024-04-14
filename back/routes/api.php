<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

Route::group([
    'middleware' => 'auth:sanctum',
], function() {
    Route::group([
        'prefix' => 'users',
        'controller' => App\Http\Controllers\UserController::class
    ], function() {
        Route::get('/', 'index');
        Route::get('/{user}', 'show')->scopeBindings();
        Route::put('/{user}', 'update')->scopeBindings();

        Route::group([
            'prefix' => '{user}/todos',
            'controller' => App\Http\Controllers\TodoController::class,
        ], function () {
            Route::get('/', 'index');
            Route::post('/', 'create');
            Route::put('/{todo}', 'update');
            Route::post('/delete', 'deleteRecords');
        })->scopeBindings();
    });
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
