<?php

namespace App\Transformers;

use App\Models\User;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Primitive;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [
        'id',
        'created_at',
        'username',
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [
        'todos',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform()
    {
        return [
            //
        ];
    }

    public function includeCreatedAt(User $user): Primitive
    {
        return $this->primitive($user->created_at);
    }

    public function includeId(User $user): Primitive
    {
        return $this->primitive($user->id);
    }

    public function includeUsername(User $user): Primitive
    {
        return $this->primitive($user->email);
    }

    public function includeTodos(User $user): Collection
    {
        return $this->collection($user->todos, app(TodoTransformer::class));
    }
}
