<?php

namespace App\Policies;

use App\Models\AuctionRegistration;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AuctionRegistrationPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, AuctionRegistration $registration): bool
    {
        return $user->isAdmin() || $user->id === $registration->user_id;
    }

    public function create(User $user): bool
    {
        return $user->exists;
    }

    public function approve(User $user, AuctionRegistration $registration): bool
    {
        return $user->isAdmin();
    }

    public function reject(User $user, AuctionRegistration $registration): bool
    {
        return $user->isAdmin();
    }
}
