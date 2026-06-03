<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            'user_id'        => $request->user()->id,
            'game_id'        => $game->id,
            'price_paid'     => $pricePaid,
            'activation_key' => strtoupper(Str::random(5)) . '-' .
                                 strtoupper(Str::random(5)) . '-' .
                                 strtoupper(Str::random(5)),
            'purchased_at'   => now(),
        ]);

        return response()->json($purchase->load('game.categories'), 201);
    }

    public function index(Request $request)
    {
        $purchases = $request->user()->purchases()
            ->with('game.categories')
            ->latest('purchased_at')
            ->get();

        return response()->json($purchases);
    }

    public function library(Request $request)
    {
        $purchases = $request->user()->purchases()
            ->with('game.categories')
            ->latest('purchased_at')
            ->get();

        // Devuelve los juegos con su clave de activación
        $library = $purchases->map(function ($purchase) {
            return [
                'id'             => $purchase->game->id,
                'title'          => $purchase->game->title,
                'platform'       => $purchase->game->platform,
                'image_url'      => $purchase->game->image_url,
                'categories'     => $purchase->game->categories,
                'activation_key' => $purchase->activation_key,
                'purchased_at'   => $purchase->purchased_at,
                'price_paid'     => $purchase->price_paid,
            ];
        });

        return response()->json($library);
    }
}