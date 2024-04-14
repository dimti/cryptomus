<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use App\Transformers\TodoTransformer;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TodoController extends Controller
{
    public function index(User $user): JsonResponse
    {
        return fractal(Todo::whereHas('user', fn($query) => $query->where('id', $user->id))->get(), TodoTransformer::class)->respond();
    }

    public function create(User $user, Request $request)
    {
        $this->validateSaveRequest($request);

        $todo = new Todo();

        $todo->fill($request->input());

        $todo->user()->associate($user);

        $todo->save();

        return fractal($todo, TodoTransformer::class)->respond();
    }

    public function update(User $user, Todo $todo, Request $request)
    {
        $this->validateSaveRequest($request);

        $todo->fill($request->input());

        $todo->save();

        return fractal($todo, TodoTransformer::class)->respond();
    }

    protected function validateSaveRequest(Request $request)
    {
        $request->validate([
            'title' => [
                'required'
            ],
        ]);
    }
}
