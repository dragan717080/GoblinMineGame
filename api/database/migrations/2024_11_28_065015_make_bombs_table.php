<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bombs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('bombs');
            $table->float('multiplier');
            $table->integer('payoff');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bombs');
    }
};
