<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $rules = [
        'title' => 'required',
    ];

    protected $fillable = [
        'title',
        'completed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
