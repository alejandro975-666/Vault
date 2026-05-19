<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'game_id' => 'required|exists:games,id',
        ]);

        $game = Game::findOrFail($data['game_id']);

        // Comprobar si ya lo tiene
        $alreadyOwned = Purchase::where('user_id', $request->user()->id)
            ->where('game_id', $game->id)->exists();

        if ($alreadyOwned) {
            return response()->json(['message' => 'Ya tienes este juego.'], 409);
        }

        $pricePaid = $game->discount > 0 ? $game->discount_price : $game->price;

        $purchase = Purchase::create([
            'user_id'      => $request->user()->id,
            'game_id'      => $game->id,
            'price_paid'   => $pricePaid,
            'purchased_at' => now(),
        ]);

        return response()->json($purchase->load('game.categories'), 201);
    }

    public function library(Request $request)
    {
        $games = $request->user()->library()->with('categories')->get();
        return response()->json($games);
    }

    public function index(Request $request)
    {
        $purchases = $request->user()->purchases()
            ->with('game.categories')
            ->latest('purchased_at')
            ->get();

        return response()->json($purchases);
    }
}