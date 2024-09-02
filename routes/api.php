<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:api')->group(function () {
    Route::post('store', [NoteController::class, 'store']);
    Route::get('index', [NoteController::class, 'index']);
    Route::delete('destroy/{id}', [NoteController::class, 'destroy']);
    Route::put('update/{id}', [NoteController::class, 'update']);
});
