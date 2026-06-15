<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'developer',
        'publisher',
        'release_date',
        'original_price',
        'discount_price',
        'discount',
        'image_url',
        'images',
        'trailer_url',
        'platform',
        'languages',
        'status',
        'admin_id',
    ];
    
    protected $casts = [
        'original_price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'discount'       => 'integer',
        'release_date'   => 'date:Y-m-d',
        'images'         => 'array',
    ];

    // ─── Relaciones ────────────────────────────────────────

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'game_category', 'game_id', 'category_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    // ─── Accessors ─────────────────────────────────────────

    public function getDiscountPriceAttribute($value)
    {
        if ($this->discount > 0) {
            return round($this->original_price * (1 - $this->discount / 100), 2);
        }
        return $this->original_price;
    }

    public function getOriginalPriceAttribute($value)
    {
        return $value ?? $this->price;
    }

    // ─── Scopes ────────────────────────────────────────────

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeByDiscount($query)
    {
        return $query->orderBy('discount', 'desc');
    }

    // ─── Helpers ───────────────────────────────────────────

    public function isOwnedBy(string $userId): bool
    {
        return $this->purchases()->where('user_id', $userId)->exists();
    }
}
