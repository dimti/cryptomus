<?php

use App\Models\Todo;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;

it('has todos', function () {
    $user = getRandomOrCreateUser();

    Todo::factory([
        'user_id' => $user->id
    ])->count(20)->create();

    $response = $this
        ->actingAs($user)
        ->getJson('/api/users/' . $user->id . '/todos');

    $response->assertStatus(200);

    expect($response->json('data'))->toHaveCount(20);
});

it('fail to get users for non authorized guests', function () {
    $user = getRandomOrCreateUser();

    Todo::factory([
        'user_id' => $user->id
    ])->create();

    $response = $this->getJson('/api/users/' . $user->id . '/todos');

    $response->assertStatus(401);
});

it('create todo', function () {
    $user = getRandomOrCreateUser();

    $todoAttributes = Todo::factory([
        'user_id' => $user->id,
    ])->raw();

    $response = $this
        ->actingAs($user)
        ->postJson('/api/users/' . $user->id . '/todos', $todoAttributes);

    $response->assertStatus(200);

    assertDatabaseHas('todos', $todoAttributes);
});

it('delete todos', function () {
    $user = getRandomOrCreateUser();

    Todo::factory([
        'user_id' => $user->id
    ])->count(20)->create();

    $selectedTodos = Todo::inRandomOrder()->whereUserId($user->id)->take(5)->get();

    $response = $this
        ->actingAs($user)
        ->postJson('/api/users/' . $user->id . '/todos/delete', [
            'id' => $selectedTodos->pluck('id')->toArray(),
        ]);

    $response->assertStatus(200);

    foreach ($selectedTodos as $todo) {
        assertDatabaseMissing('todos', $todo->getAttributes());
    }
});
