<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('more_less', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('known');
            $table->string('option');
            $table->integer('guessed');
            $table->integer('stake');
            $table->float('multiplier');
            $table->integer('payoff');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('more_less');
    }
};
