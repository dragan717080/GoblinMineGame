<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bomb;

class BombSeeder extends Seeder
{
    public function run(): void
    {
        Bomb::factory(10)->create();
    }
}
