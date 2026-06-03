<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;

// ─── Auth (público) ────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ─── Juegos y categorías (público) ─────────────────────
Route::get('/games',        [GameController::class, 'index']);
Route::get('/games/{game}', [GameController::class, 'show']);
Route::post('/search',      [GameController::class, 'search']);
Route::get('/categories',   [CategoryController::class, 'index']);

// ─── Rutas autenticadas ─────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::get('/me',       [AuthController::class, 'me']);
    Route::put('/profile',  [AuthController::class, 'updateProfile']);
    Route::put('/password', [AuthController::class, 'changePassword']);

    // Reviews
    Route::get('/games/{game}/reviews',  [ReviewController::class, 'index']);
    Route::post('/games/{game}/reviews', [ReviewController::class, 'store']);
    Route::delete('/reviews/{review}',   [ReviewController::class, 'destroy']);

    // Compras y biblioteca
    Route::post('/purchases', [PurchaseController::class, 'store']);
    Route::get('/purchases',  [PurchaseController::class, 'index']);
    Route::get('/library',    [PurchaseController::class, 'library']);

    // Carrito — comprar varios juegos a la vez
    Route::post('/cart/checkout', [CartController::class, 'checkout']);

    // Lista de deseos
    Route::get('/wishlist',           [WishlistController::class, 'index']);
    Route::post('/wishlist/{game}',   [WishlistController::class, 'store']);
    Route::delete('/wishlist/{game}', [WishlistController::class, 'destroy']);

    // Feed personalizado
    Route::get('/feed', [FeedController::class, 'index']);

    // ─── Admin ─────────────────────────────────────────
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/users',                    [AdminController::class, 'users']);
        Route::put('/users/{user}',             [AdminController::class, 'toggleUser']);
        Route::get('/stats',                    [AdminController::class, 'stats']);

        // CRUD completo de juegos (solo admin)
        Route::post('/games',                   [GameController::class, 'store']);
        Route::put('/games/{game}',             [GameController::class, 'update']);
        Route::delete('/games/{game}',          [GameController::class, 'destroy']);

        // Categorías (solo admin)
        Route::post('/categories',              [CategoryController::class, 'store']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    });
});