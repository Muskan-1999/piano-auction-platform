<?php

namespace App\Services;

use App\Events\BidOutbid;
use App\Events\BidPlaced;
use App\Models\Bid;
use App\Models\Lot;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class BidService
{
    public function placeBid(Lot $lot, User $user, float $amount, string $bidType, ?string $ipAddress = null, ?string $userAgent = null): Bid
    {
        if (! $lot->canAcceptBids()) {
            throw new \Exception('This lot cannot accept bids.');
        }

        if ($amount <= $lot->current_bid) {
            throw new \Exception('Bid amount must be greater than current bid.');
        }

        if ($lot->bid_increment > 0) {
            $difference = $amount - $lot->current_bid;
            $incrementMultiples = round($difference / $lot->bid_increment, 10);

            if ($incrementMultiples < 1 || abs($incrementMultiples - round($incrementMultiples)) > 0.00001) {
                throw new \Exception('Bid must increase by the lot bid increment.');
            }
        }

        if ($bidType === Bid::TYPE_ADMIN && ! $user->isAdmin()) {
            throw new \Exception('Admin bid type is restricted to administrators.');
        }

        return DB::transaction(function () use ($lot, $user, $amount, $bidType, $ipAddress, $userAgent) {
            $previousWinningBids = Bid::where('lot_id', $lot->id)
                ->where('status', Bid::STATUS_WINNING)
                ->get();

            Bid::where('lot_id', $lot->id)
                ->where('status', Bid::STATUS_WINNING)
                ->update([
                    'status' => Bid::STATUS_OUTBID,
                    'is_winning' => false,
                ]);

            $bid = Bid::create([
                'lot_id' => $lot->id,
                'user_id' => $user->id,
                'amount' => $amount,
                'bid_type' => $bidType,
                'status' => Bid::STATUS_WINNING,
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
                'placed_at' => now(),
                'is_winning' => true,
                'is_live_bid' => true,
            ]);

            $lot->current_bid = $amount;
            $lot->save();

            DB::afterCommit(function () use ($bid, $previousWinningBids) {
                foreach ($previousWinningBids as $previousBid) {
                    BidOutbid::dispatch($previousBid);
                }

                BidPlaced::dispatch($bid);
            });

            return $bid;
        });
    }

    public function getLotHistory(Lot $lot, int $perPage = 20)
    {
        return Bid::with('user')
            ->where('lot_id', $lot->id)
            ->orderByDesc('placed_at')
            ->paginate($perPage);
    }

    public function getUserBids(User $user, int $perPage = 20)
    {
        return Bid::with('lot')
            ->where('user_id', $user->id)
            ->orderByDesc('placed_at')
            ->paginate($perPage);
    }

    public function getAllBids(int $perPage = 20)
    {
        return Bid::with(['lot', 'user'])
            ->orderByDesc('placed_at')
            ->paginate($perPage);
    }
}
