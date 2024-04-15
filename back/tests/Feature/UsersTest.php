<?php

use App\Models\User;
use App\Transformers\UserTransformer;

it('has users', function () {
    User::factory()->count(20)->create();

    $response = $this
        ->actingAs(getRandomOrCreateUser())
        ->getJson('/api/users');

    $response->assertStatus(200);
});

it('fail to get users for non authorized guests', function () {
    User::factory()->create();

    $response = $this
        ->getJson('/api/users');

    $response->assertStatus(401);
});

it('show user', function () {
    $response = $this
        ->actingAs(getRandomOrCreateUser())
        ->getJson('/api/users/' . ($user = User::inRandomOrder()->first())->id);

    $response->assertStatus(200)->assertJson(
        getTransformedResponseArray($user, UserTransformer::class)
    );
});
