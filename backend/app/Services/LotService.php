<?php

namespace App\Services;

use App\Events\LotEnded;
use App\Events\LotStarted;
use App\Models\Lot;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LotService
{
    public function create(int $auctionId, array $data): Lot
    {
        return DB::transaction(function () use ($auctionId, $data) {
            $data['auction_id'] = $auctionId;
            $data['slug'] = Str::slug($data['title']);
            $data['current_bid'] = $data['starting_bid'];

            return Lot::create($data);
        });
    }

    public function update(Lot $lot, array $data): Lot
    {
        return DB::transaction(function () use ($lot, $data) {
            if (isset($data['title']) && $data['title'] !== $lot->title) {
                $data['slug'] = $lot->generateSlug($data['title'], $lot->auction_id);
            }

            $lot->fill($data);
            $lot->save();

            return $lot;
        });
    }

    public function changeStatus(Lot $lot, string $status): Lot
    {
        return DB::transaction(function () use ($lot, $status) {
            $originalStatus = $lot->status;
            $lot->status = $status;

            if ($status === Lot::STATUS_LIVE) {
                $lot->is_active = true;
            }

            if ($status === Lot::STATUS_SOLD || $status === Lot::STATUS_UNSOLD || $status === Lot::STATUS_WITHDRAWN) {
                $lot->is_active = false;
            }

            $lot->save();

            if ($originalStatus !== $lot->status) {
                if ($lot->status === Lot::STATUS_LIVE) {
                    DB::afterCommit(fn () => LotStarted::dispatch($lot));
                }

                if (in_array($lot->status, [Lot::STATUS_SOLD, Lot::STATUS_UNSOLD, Lot::STATUS_WITHDRAWN], true)) {
                    DB::afterCommit(fn () => LotEnded::dispatch($lot));
                }
            }

            return $lot;
        });
    }

    public function updateBid(Lot $lot, float $bidAmount): Lot
    {
        if (!$lot->canAcceptBids()) {
            throw new \Exception('This lot cannot accept bids.');
        }

        if ($bidAmount <= $lot->current_bid) {
            throw new \Exception('Bid must be higher than current bid.');
        }

        $lot->current_bid = $bidAmount;
        $lot->save();

        return $lot;
    }

    public function delete(Lot $lot): void
    {
        $lot->delete();
    }
}
