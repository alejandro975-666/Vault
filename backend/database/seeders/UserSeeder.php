<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id'       => (string) Str::uuid(),
            'name'     => 'Alejandro',
            'email'    => 'alejandro@vault.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
            'active'   => true,
        ]);

        User::create([
            'id'       => (string) Str::uuid(),
            'name'     => 'Luis',
            'email'    => 'luis@vault.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
            'active'   => true,
        ]);

        User::create([
            'id'       => (string) Str::uuid(),
            'name'     => 'Fran',
            'email'    => 'fran@vault.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
            'active'   => true,
        ]);
    }
}