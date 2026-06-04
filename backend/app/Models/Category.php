<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name'];

    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_category', 'category_id', 'game_id');
    }
}
