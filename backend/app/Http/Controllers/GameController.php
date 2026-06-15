<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $query = Game::with(['categories', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->where('status', 'published');

        // Filtro por búsqueda de texto
        if ($request->filled('query')) {
            $search = $request->get('query');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('developer', 'LIKE', "%{$search}%");
            });
        }

        // Filtro por categoría
        if ($request->filled('category')) {
            $query->whereHas('categories', fn($q) =>
                $q->where('name', $request->category)
            );
        }

        // Filtro por plataforma
        if ($request->filled('platform')) {
            $query->where('platform', $request->platform);
        }

        // Filtro por precio
        if ($request->filled('price')) {
            match ($request->price) {
                'free'    => $query->where('original_price', 0),
                'under10' => $query->where('original_price', '<', 10)->where('original_price', '>', 0),
                '10to30'  => $query->whereBetween('original_price', [10, 30]),
                'over30'  => $query->where('original_price', '>', 30),
                default   => null,
            };
        }

        // Filtro por valoración mínima
        if ($request->filled('rating')) {
            $query->whereIn('games.id', function ($q) use ($request) {
                $q->select('game_id')
                  ->from('reviews')
                  ->groupBy('game_id')
                  ->havingRaw('AVG(rating) >= ?', [$request->rating]);
            });
        }

        // Ordenación
        match ($request->get('sort', 'popular')) {
            'price_asc'  => $query->orderBy('original_price', 'asc'),
            'price_desc' => $query->orderBy('original_price', 'desc'),
            'rating'     => $query->orderByDesc('reviews_avg_rating'),
            'newest'     => $query->orderByDesc('release_date'),
            'discount'   => $query->orderByDesc('discount'),
            default      => $query->orderByDesc('id'),
        };

        return response()->json($query->get());
    }

    public function show(Game $game)
    {
        $game->load(['categories', 'reviews.user']);
        $game->loadAvg('reviews', 'rating');
        return response()->json($game);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'developer'      => 'nullable|string|max:255',
            'publisher'      => 'nullable|string|max:255',
            'release_date'   => 'nullable|date',
            'original_price' => 'required|numeric|min:0',
            'discount'       => 'nullable|integer|min:0|max:100',
            'image_url'      => 'nullable|url',
            'platform'       => 'nullable|string',
            'languages'      => 'nullable|string',
            'status'         => 'in:draft,published',
            'categories'     => 'nullable|array',
            'categories.*'   => 'exists:categories,id',
            'admin_id'       => 'nullable|string',
            'images'         => 'nullable|array',
            'images.*'       => 'url',
            'trailer_url'    => 'nullable|url',
        ]);

        // Calcular discount_price automáticamente
        $discount = $data['discount'] ?? 0;
        $data['discount_price'] = $discount > 0
            ? round($data['original_price'] * (1 - $discount / 100), 2)
            : $data['original_price'];

        $game = Game::create($data);

        if (!empty($data['categories'])) {
            $game->categories()->sync($data['categories']);
        }

        return response()->json($game->load('categories'), 201);
    }

    public function update(Request $request, Game $game)
    {
        $data = $request->validate([
            'title'          => 'sometimes|string|max:255',
            'description'    => 'nullable|string',
            'developer'      => 'nullable|string|max:255',
            'publisher'      => 'nullable|string|max:255',
            'release_date'   => 'nullable|date',
            'original_price' => 'sometimes|numeric|min:0',
            'discount'       => 'nullable|integer|min:0|max:100',
            'image_url'      => 'nullable|url',
            'platform'       => 'nullable|string',
            'languages'      => 'nullable|string',
            'status'         => 'in:draft,published',
            'categories'     => 'nullable|array',
            'categories.*'   => 'exists:categories,id',
            'images'         => 'nullable|array',
            'images.*'       => 'url',
            'trailer_url'    => 'nullable|url',
        ]);

        // Recalcular discount_price automáticamente
        $originalPrice = $data['original_price'] ?? $game->original_price;
        $discount      = $data['discount'] ?? $game->discount ?? 0;
        $data['discount_price'] = $discount > 0
            ? round($originalPrice * (1 - $discount / 100), 2)
            : $originalPrice;

        $game->update($data);

        if (isset($data['categories'])) {
            $game->categories()->sync($data['categories']);
        }

        return response()->json($game->load('categories'));
    }

    public function destroy(Game $game)
    {
        $game->delete();
        return response()->json(['message' => 'Juego eliminado.']);
    }

    public function search(Request $request)
    {
        $search = $request->validate(['query' => 'required|string|min:2'])['query'];

        $games = Game::with(['categories'])
            ->withAvg('reviews', 'rating')
            ->where('status', 'published')
            ->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('developer', 'LIKE', "%{$search}%");
            })
            ->limit(20)
            ->get();

        return response()->json($games);
    }
}
