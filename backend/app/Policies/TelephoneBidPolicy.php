<?php

namespace App\Policies;

use App\Models\TelephoneBid;
use App\Models\User;

class TelephoneBidPolicy
{
    public function viewAny(?User $user): bool
    {
        return $user?->isAdmin() === true;
    }

    public function view(?User $user, TelephoneBid $telephoneBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function create(?User $user): bool
    {
        return true;
    }

    public function update(?User $user, TelephoneBid $telephoneBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function approve(?User $user, TelephoneBid $telephoneBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function reject(?User $user, TelephoneBid $telephoneBid): bool
    {
        return $user?->isAdmin() === true;
    }
}
