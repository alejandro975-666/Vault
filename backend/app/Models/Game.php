<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'developer',
        'publisher',
        'release_date',
        'price',
        'original_price',
        'discount_price',
        'discount',
        'image_url',
        'platform',
        'languages',
        'status',
        'admin_id',
    ];

    protected $casts = [
        'price'          => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'discount'       => 'integer',
        'release_date'   => 'date:Y-m-d',
    ];

    // ─── Relaciones ────────────────────────────────────────

    public function categories()
    {
        return $this->belongsToMany(Category::class);
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

    // Precio final con descuento aplicado
    public function getDiscountPriceAttribute($value)
    {
        // Si tiene valor en BD lo devuelve directamente
        if ($value) return $value;

        // Si no, lo calcula a partir del precio base y el descuento
        if ($this->discount > 0) {
            return round($this->price * (1 - $this->discount / 100), 2);
        }

        return $this->price;
    }

    // Precio original (si no tiene, devuelve el precio base)
    public function getOriginalPriceAttribute($value)
    {
        return $value ?? $this->price;
    }

    // ─── Scopes ────────────────────────────────────────────

    // Solo juegos publicados
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    // Ordenar por mayor descuento
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