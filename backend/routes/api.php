<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AuctionController;
use App\Http\Controllers\API\LotController;
use App\Http\Controllers\API\PasswordResetController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [PasswordResetController::class, 'sendResetLink']);
    Route::post('reset-password', [PasswordResetController::class, 'resetPassword']);

    Route::get('auctions', [AuctionController::class, 'index']);
    Route::get('auctions/{auction}', [AuctionController::class, 'show']);
    Route::get('live-auctions', [AuctionController::class, 'liveAuctions']);

    Route::get('auctions/{auction}/lots', [LotController::class, 'indexByAuction']);
    Route::get('lots', [LotController::class, 'index']);
    Route::get('lots/{lot}', [LotController::class, 'show']);
    Route::get('live-lots', [LotController::class, 'live']);

    Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
        Route::post('auctions', [AuctionController::class, 'store']);
        Route::put('auctions/{auction}', [AuctionController::class, 'update']);
        Route::delete('auctions/{auction}', [AuctionController::class, 'destroy']);
        Route::patch('auctions/{auction}/status', [AuctionController::class, 'updateStatus']);

        Route::post('auctions/{auction}/lots', [LotController::class, 'store']);
        Route::put('lots/{lot}', [LotController::class, 'update']);
        Route::delete('lots/{lot}', [LotController::class, 'destroy']);
        Route::patch('lots/{lot}/status', [LotController::class, 'changeStatus']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});
