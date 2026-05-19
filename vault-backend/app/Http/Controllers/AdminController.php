<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Game;
use App\Models\Purchase;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function users(Request $request)
    {
        $users = User::withCount('purchases')
            ->withSum('purchases', 'price_paid')
            ->latest()
            ->get();

        return response()->json($users);
    }

    public function toggleUser(Request $request, User $user)
    {
        $data = $request->validate([
            'active' => 'sometimes|boolean',
            'role'   => 'sometimes|in:user,admin',
        ]);

        $user->update($data);
        return response()->json($user);
    }

    public function stats()
    {
        return response()->json([
            'users'     => User::count(),
            'games'     => Game::where('status', 'published')->count(),
            'purchases' => Purchase::count(),
            'revenue'   => Purchase::sum('price_paid'),
        ]);
    }
}