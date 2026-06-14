<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'game_ids'   => 'required|array|min:1',
            'game_ids.*' => 'required|exists:games,id',
        ]);

        $userId    = $request->user()->id;
        $purchases = [];
        $skipped   = [];

        foreach ($request->game_ids as $gameId) {
            $game = Game::findOrFail($gameId);

            // Comprobar si ya lo tiene
            $alreadyOwned = Purchase::where('user_id', $userId)
                ->where('game_id', $gameId)
                ->exists();

            if ($alreadyOwned) {
                $skipped[] = $game->title;
                continue;
            }

            $pricePaid = $game->discount > 0
                ? $game->discount_price
                : $game->price;

            $purchase = Purchase::create([
                'user_id'        => $userId,
                'game_id'        => $gameId,
                'price_paid'     => $pricePaid,
                'activation_key' => strtoupper(Str::random(5)) . '-' .
                                     strtoupper(Str::random(5)) . '-' .
                                     strtoupper(Str::random(5)),
                'purchased_at'   => now(),
            ]);

            $purchases[] = $purchase->load('game.categories');
        }

        return response()->json([
            'purchases' => $purchases,
            'skipped'   => $skipped,
            'message'   => count($purchases) > 0
                ? 'Compra completada correctamente.'
                : 'Todos los juegos ya estaban en tu biblioteca.',
        ], 201);
    }
}
