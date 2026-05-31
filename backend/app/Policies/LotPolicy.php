<?php

namespace App\Policies;

use App\Models\Lot;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LotPolicy
{
    use HandlesAuthorization;

    public function bid(User $user, Lot $lot): bool
    {
        return $user->hasVerifiedEmail() && $user->hasApprovedAuctionRegistration($lot->auction_id);
    }
}
