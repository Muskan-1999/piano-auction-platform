<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('auctions.{auctionId}', function ($user = null, $auctionId) {
    return true;
});

Broadcast::channel('live-auctions', function ($user = null) {
    return true;
});

Broadcast::channel('lots.{lotId}', function ($user = null, $lotId) {
    return true;
});
