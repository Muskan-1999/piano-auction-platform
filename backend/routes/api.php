<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AuctionController;
use App\Http\Controllers\API\AbsenteeBidController;
use App\Http\Controllers\API\LotController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\Public\AuctionController as PublicAuctionController;
use App\Http\Controllers\API\Public\HomepageController as PublicHomepageController;
use App\Http\Controllers\API\Public\LotController as PublicLotController;
use App\Http\Controllers\API\Public\SearchController as PublicSearchController;
use App\Http\Controllers\API\TelephoneBidController;
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
    Route::get('lots/{lot}/bids', [\App\Http\Controllers\API\BidController::class, 'indexByLot']);
    Route::get('bids/{bid}', [\App\Http\Controllers\API\BidController::class, 'show']);
    Route::get('live-lots', [LotController::class, 'live']);

    Route::get('public/homepage', [PublicHomepageController::class, 'index']);
    Route::get('public/featured-auctions', [PublicAuctionController::class, 'featured']);
    Route::get('public/auctions', [PublicAuctionController::class, 'index']);
    Route::get('public/auctions/{slug}', [PublicAuctionController::class, 'show']);
    Route::get('public/live-auctions', [PublicAuctionController::class, 'live']);
    Route::get('public/lots', [PublicLotController::class, 'index']);
    Route::get('public/lots/{slug}', [PublicLotController::class, 'show']);
    Route::get('public/search', [PublicSearchController::class, 'index']);

    Route::post('telephone-bids', [TelephoneBidController::class, 'store']);
    Route::post('absentee-bids', [AbsenteeBidController::class, 'store']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('lots/{lot}/bid', [\App\Http\Controllers\API\BidController::class, 'store']);
        Route::get('user/bids', [\App\Http\Controllers\API\BidController::class, 'userBids']);
    });

    Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
        Route::get('bids', [\App\Http\Controllers\API\BidController::class, 'index']);
        Route::post('auctions', [AuctionController::class, 'store']);
        Route::put('auctions/{auction}', [AuctionController::class, 'update']);
        Route::delete('auctions/{auction}', [AuctionController::class, 'destroy']);
        Route::patch('auctions/{auction}/status', [AuctionController::class, 'updateStatus']);

        Route::post('auctions/{auction}/lots', [LotController::class, 'store']);
        Route::put('lots/{lot}', [LotController::class, 'update']);
        Route::delete('lots/{lot}', [LotController::class, 'destroy']);
        Route::patch('lots/{lot}/status', [LotController::class, 'changeStatus']);

        Route::get('telephone-bids', [TelephoneBidController::class, 'index']);
        Route::post('telephone-bids/{telephoneBid}/approve', [TelephoneBidController::class, 'approve']);
        Route::post('telephone-bids/{telephoneBid}/reject', [TelephoneBidController::class, 'reject']);
        Route::patch('telephone-bids/{telephoneBid}', [TelephoneBidController::class, 'update']);

        Route::get('absentee-bids', [AbsenteeBidController::class, 'index']);
        Route::post('absentee-bids/{absenteeBid}/approve', [AbsenteeBidController::class, 'approve']);
        Route::post('absentee-bids/{absenteeBid}/reject', [AbsenteeBidController::class, 'reject']);
        Route::patch('absentee-bids/{absenteeBid}', [AbsenteeBidController::class, 'update']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});
