<?php

use Illuminate\Support\Facades\Broadcast;

// Laravel's default model channel
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Private per-user channel for real-time approval/rejection notifications
Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

// Public auction channels
Broadcast::channel('auctions.{auctionId}', function ($user = null, $auctionId) {
    return true;
});

Broadcast::channel('live-auctions', function ($user = null) {
    return true;
});

// Lot bidding channel — public so all visitors see live bids
Broadcast::channel('lots.{lotId}', function ($user = null, $lotId) {
    return true;
});
