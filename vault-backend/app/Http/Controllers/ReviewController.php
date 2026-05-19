<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Game $game)
    {
        $reviews = $game->reviews()->with('user:id,name')->latest()->get();
        return response()->json($reviews);
    }

    public function store(Request $request, Game $game)
    {
        // Verificar que el usuario ha comprado el juego
        $hasPurchased = $request->user()->purchases()
            ->where('game_id', $game->id)->exists();

        if (!$hasPurchased) {
            return response()->json(['message' => 'Debes comprar el juego para reseñarlo.'], 403);
        }

        // Verificar que no tenga ya una reseña
        $alreadyReviewed = Review::where('user_id', $request->user()->id)
            ->where('game_id', $game->id)->exists();

        if ($alreadyReviewed) {
            return response()->json(['message' => 'Ya has reseñado este juego.'], 409);
        }

        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'body'   => 'required|string|min:10|max:1000',
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'game_id' => $game->id,
            'rating'  => $data['rating'],
            'body'    => $data['body'],
        ]);

        return response()->json($review->load('user:id,name'), 201);
    }

    public function destroy(Request $request, Review $review)
    {
        // Solo el autor o un admin pueden borrar
        if ($request->user()->id !== $review->user_id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Reseña eliminada.']);
    }
}