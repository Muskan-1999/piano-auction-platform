<?php

namespace App\Actions;

use App\Models\Bid;
use App\Models\Lot;
use App\Models\User;
use App\Services\BidService;

class PlaceBidAction
{
    public function __construct(private BidService $bidService)
    {
    }

    public function execute(
        Lot $lot,
        User $user,
        float $amount,
        string $bidType = Bid::TYPE_ONLINE,
        ?string $ipAddress = null,
        ?string $userAgent = null
    ): Bid {
        return $this->bidService->placeBid($lot, $user, $amount, $bidType, $ipAddress, $userAgent);
    }
}
