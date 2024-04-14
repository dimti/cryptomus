<?php

namespace App\Transformers;

use App\Models\Todo;
use League\Fractal\Resource\Primitive;
use League\Fractal\TransformerAbstract;

class TodoTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [
        'id',
        'created_at',
        'title',
        'completed',
        'user_id',
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [
        'user',
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

    public function includeId(Todo $todo): Primitive
    {
        return $this->primitive($todo->id);
    }

    public function includeCreatedAt(Todo $todo): Primitive
    {
        return $this->primitive($todo->created_at);
    }

    public function includeTitle(Todo $todo): Primitive
    {
        return $this->primitive($todo->title);
    }

    public function includeCompleted(Todo $todo): Primitive
    {
        return $this->primitive($todo->completed);
    }

    public function includeUser(Todo $todo)
    {
        return $this->item($todo->user, app(UserTransformer::class));
    }

    public function includeUserId(Todo $todo): Primitive
    {
        return $this->primitive($todo->user_id);
    }
}
