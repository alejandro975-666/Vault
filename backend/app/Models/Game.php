<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'developer', 'publisher',
        'release_date', 'price', 'original_price', 'discount',
        'image_url', 'platform', 'languages', 'status'
    ];

    protected $casts = [
        'price'          => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount'       => 'integer',
        'release_date'   => 'date:Y-m-d',
    ];

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

    // Precio final con descuento
    public function getDiscountPriceAttribute()
    {
        if ($this->discount > 0) {
            return round($this->price * (1 - $this->discount / 100), 2);
        }
        return $this->price;
    }
}