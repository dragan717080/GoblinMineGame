<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    BombController,
};

Route::prefix('bombs')->group(function() {
    Route::get('/', [BombController::class, 'getAll']);
    Route::get('/{id}', [BombController::class, 'getById']);
    Route::post('/', [BombController::class, 'create']);
    Route::patch('/{id}', [BombController::class, 'update']);
    Route::delete('/{id}', [BombController::class, 'delete']);
});

Route::get('/', function () {
    return view('welcome');
});
