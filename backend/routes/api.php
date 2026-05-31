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
use App\Http\Controllers\API\ContactUsController;
use App\Http\Controllers\API\TelephoneBidController;
use App\Http\Controllers\API\AuctionRegistrationController;
use App\Http\Controllers\API\BiddingController;
use App\Http\Controllers\API\WatchlistController;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

// Must live outside the 'api.' name group so Laravel resolves it as 'verification.verify' exactly
Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware('signed')
    ->name('verification.verify');

// Broadcasting auth — must use Sanctum token auth, exposed under /api prefix
Route::post('/broadcasting/auth', function (\Illuminate\Http\Request $request) {
    return Broadcast::auth($request);
})->middleware('auth:sanctum');

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

    Route::post('contact', [ContactUsController::class, 'store']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('telephone-bids', [TelephoneBidController::class, 'store']);
        Route::post('absentee-bids', [AbsenteeBidController::class, 'store']);

        // New bidding endpoints
        Route::post('bidding/telephone', [BiddingController::class, 'telephone']);
        Route::post('bidding/absentee', [BiddingController::class, 'absentee']);
        Route::post('bidding/online', [BiddingController::class, 'online']);

        Route::post('lots/{lot}/bid', [\App\Http\Controllers\API\BidController::class, 'store']);
        Route::get('user/bids', [\App\Http\Controllers\API\BidController::class, 'userBids']);
        Route::get('user/auction-registrations', [AuctionRegistrationController::class, 'userRegistrations']);

        Route::get('watchlist', [WatchlistController::class, 'index']);
        Route::get('watchlist/check/{lot}', [WatchlistController::class, 'check']);
        Route::post('watchlist/{lot}', [WatchlistController::class, 'store']);
        Route::delete('watchlist/{lot}', [WatchlistController::class, 'destroy']);

        Route::post('email/verification-notification', [AuthController::class, 'resendVerification']);
        Route::post('auction-registrations', [AuctionRegistrationController::class, 'store']);
        Route::get('auction-registrations/check/{auction}', [AuctionRegistrationController::class, 'check']);
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

        Route::get('auction-registrations', [AuctionRegistrationController::class, 'index']);
        Route::post('auction-registrations/{auctionRegistration}/approve', [AuctionRegistrationController::class, 'approve']);
        Route::post('auction-registrations/{auctionRegistration}/reject', [AuctionRegistrationController::class, 'reject']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});
