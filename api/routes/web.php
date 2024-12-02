<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    BombController,
    MoreLessController
};

Route::prefix('bombs')->group(function() {
    Route::get('/', [BombController::class, 'getAll']);
    Route::get('/{id}', [BombController::class, 'getById']);
    Route::post('/', [BombController::class, 'create']);
    Route::patch('/{id}', [BombController::class, 'update']);
    Route::delete('/{id}', [BombController::class, 'delete']);
});

Route::prefix('more-or-less')->group(function() {
    Route::get('/', [MoreLessController::class, 'getAll']);
    Route::get('/{id}', [MoreLessController::class, 'getById']);
    Route::post('/', [MoreLessController::class, 'create']);
    Route::patch('/{id}', [MoreLessController::class, 'update']);
    Route::delete('/{id}', [MoreLessController::class, 'delete']);
});

Route::get('/', function () {
    return view('welcome');
});
