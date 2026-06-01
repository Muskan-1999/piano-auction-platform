<?php

namespace App\Policies;

use App\Models\AbsenteeBid;
use App\Models\User;

class AbsenteeBidPolicy
{
    public function viewAny(?User $user): bool
    {
        return $user?->isAdmin() === true;
    }

    public function view(?User $user, AbsenteeBid $absenteeBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function create(?User $user): bool
    {
        return true;
    }

    public function update(?User $user, AbsenteeBid $absenteeBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function approve(?User $user, AbsenteeBid $absenteeBid): bool
    {
        return $user?->isAdmin() === true;
    }

    public function reject(?User $user, AbsenteeBid $absenteeBid): bool
    {
        return $user?->isAdmin() === true;
    }
}
