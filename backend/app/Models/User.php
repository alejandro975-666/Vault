<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'active'            => 'boolean',
    ];

    // ─── Relaciones ────────────────────────────────────────

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function library()
    {
        return $this->belongsToMany(Game::class, 'purchases')
                    ->withPivot('price_paid', 'activation_key', 'purchased_at')
                    ->withTimestamps();
    }

    public function wishlist()
    {
        return $this->belongsToMany(Game::class, 'wishlists')
                    ->withTimestamps();
    }

    public function searchHistories()
    {
        return $this->hasMany(SearchHistory::class);
    }

    // ─── Helpers ───────────────────────────────────────────

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function ownsGame(string $gameId): bool
    {
        return $this->purchases()->where('game_id', $gameId)->exists();
    }
}