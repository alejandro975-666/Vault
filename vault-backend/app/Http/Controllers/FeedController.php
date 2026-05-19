<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Categorías favoritas del usuario (basadas en sus compras)
        $favoriteCategories = $user->library()
            ->with('categories')
            ->get()
            ->pluck('categories')
            ->flatten()
            ->pluck('id')
            ->unique()
            ->toArray();

        // Recomendados: juegos de categorías favoritas que no tiene
        $recommended = Game::with(['categories'])
            ->withAvg('reviews', 'rating')
            ->where('status', 'published')
            ->whereDoesntHave('purchases', fn($q) =>
                $q->where('user_id', $user->id)
            )
            ->when(!empty($favoriteCategories), fn($q) =>
                $q->whereHas('categories', fn($q2) =>
                    $q2->whereIn('categories.id', $favoriteCategories)
                )
            )
            ->inRandomOrder()
            ->limit(6)
            ->get();

        // Más vendidos generales
        $topSellers = Game::with(['categories'])
            ->withAvg('reviews', 'rating')
            ->withCount('purchases')
            ->where('status', 'published')
            ->orderByDesc('purchases_count')
            ->limit(6)
            ->get();

        // Novedades
        $newest = Game::with(['categories'])
            ->withAvg('reviews', 'rating')
            ->where('status', 'published')
            ->orderByDesc('release_date')
            ->limit(6)
            ->get();

        return response()->json([
            'recommended' => $recommended,
            'top_sellers' => $topSellers,
            'newest'      => $newest,
        ]);
    }
}