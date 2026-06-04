<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'RPG',
            'Acción',
            'Indie',
            'Estrategia',
            'Aventura',
            'Deportes',
            'Simulación',
        ];

        foreach ($categories as $name) {
            Category::create([
                'id'   => (string) Str::uuid(),
                'name' => $name,
            ]);
        }
    }
}