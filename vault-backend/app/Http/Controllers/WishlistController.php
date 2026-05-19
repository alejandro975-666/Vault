<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $games = $request->user()->wishlist()->with('categories')->get();
        return response()->json($games);
    }

    public function store(Request $request, Game $game)
    {
        $request->user()->wishlist()->syncWithoutDetaching([$game->id]);
        return response()->json(['message' => 'Añadido a la lista de deseos.']);
    }

    public function destroy(Request $request, Game $game)
    {
        $request->user()->wishlist()->detach($game->id);
        return response()->json(['message' => 'Eliminado de la lista de deseos.']);
    }
}