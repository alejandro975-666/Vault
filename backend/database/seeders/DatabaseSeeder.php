<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Game;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name'     => 'Admin Vault',
            'email'    => 'admin@vault.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // Usuario normal de prueba
        User::create([
            'name'     => 'Alejandro',
            'email'    => 'alejandro@vault.com',
            'password' => Hash::make('password'),
        ]);

        // Categorías
        $categories = ['RPG', 'Acción', 'Indie', 'Estrategia', 'Aventura', 'Deportes', 'Terror', 'Simulación'];
        foreach ($categories as $name) {
            Category::create(['name' => $name, 'slug' => Str::slug($name)]);
        }

        // Juegos de ejemplo
        $games = [
            ['title' => 'Elden Ring',          'price' => 59.99, 'platform' => 'Steam',       'categories' => ['RPG', 'Acción']],
            ['title' => 'Hollow Knight',        'price' => 14.99, 'platform' => 'Steam',       'categories' => ['Indie', 'Aventura']],
            ['title' => 'Civilization VI',      'price' => 29.99, 'platform' => 'Epic',        'categories' => ['Estrategia']],
            ['title' => 'FIFA 24',              'price' => 49.99, 'platform' => 'PlayStation', 'categories' => ['Deportes']],
            ['title' => 'Stardew Valley',       'price' => 13.99, 'platform' => 'GOG',         'categories' => ['Indie', 'Simulación']],
            ['title' => 'Resident Evil 4',      'price' => 39.99, 'platform' => 'Steam',       'categories' => ['Terror', 'Acción']],
            ['title' => 'Celeste',              'price' => 0,     'platform' => 'Epic',        'categories' => ['Indie']],
            ['title' => 'The Witcher 3',        'price' => 9.99,  'platform' => 'GOG',         'categories' => ['RPG', 'Aventura']],
            ['title' => 'Among Us',             'price' => 3.99,  'platform' => 'Steam',       'categories' => ['Indie']],
            ['title' => 'Red Dead Redemption 2','price' => 39.99, 'platform' => 'Epic',        'categories' => ['Aventura', 'Acción']],
        ];

        foreach ($games as $gameData) {
            $cats = $gameData['categories'];
            unset($gameData['categories']);

            $game = Game::create(array_merge($gameData, [
                'developer'    => 'Vault Studios',
                'description'  => 'Un increíble juego de la plataforma Vault Games.',
                'release_date' => now()->subMonths(rand(1, 24)),
                'status'       => 'published',
                'languages'    => 'Español, English',
            ]));

            $catIds = Category::whereIn('name', $cats)->pluck('id');
            $game->categories()->attach($catIds);
        }
    }
}