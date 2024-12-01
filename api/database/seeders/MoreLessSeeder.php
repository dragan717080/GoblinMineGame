<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MoreLess;

class MoreLessSeeder extends Seeder
{
    public function run(): void
    {
        MoreLess::factory(10)->create();
    }
}
