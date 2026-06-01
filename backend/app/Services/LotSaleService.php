<?php

namespace App\Services;

use App\Events\AuctionEnded;
use App\Events\LotSold;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\Lot;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LotSaleService
{
    /**
     * Mark a lot as SOLD:
     *  1. Find the highest winning bid.
     *  2. Persist winner_id, winning_bid_amount, sold_at on the lot.
     *  3. Set is_winner = true on the winning bid.
     *  4. Set is_winner = false on all other bids for this lot.
     *  5. Broadcast LotSold via Reverb.
     *  6. Auto-end the parent auction if all lots are resolved.
     */
    public function markAsSold(Lot $lot): Lot
    {
        if ($lot->isSold()) {
            Log::warning('LotSaleService: lot already sold', ['lot_id' => $lot->id]);
            return $lot;
        }

        Log::info('LotSaleService: starting markAsSold', [
            'lot_id'     => $lot->id,
            'lot_number' => $lot->lot_number,
            'auction_id' => $lot->auction_id,
        ]);

        DB::transaction(function () use ($lot) {

            // ── Step 1: find winning bid ─────────────────────────────────
            Log::info('LotSaleService: finding winning bid', ['lot_id' => $lot->id]);

            $winningBid = Bid::where('lot_id', $lot->id)
                ->orderByDesc('amount')
                ->first();

            Log::info('LotSaleService: winning bid result', [
                'bid_id'    => $winningBid?->id,
                'user_id'   => $winningBid?->user_id,
                'amount'    => $winningBid?->amount,
            ]);

            $soldAt = now();

            // ── Step 2: save winner fields on the lot ─────────────────────
            $lot->update([
                'status'             => Lot::STATUS_SOLD,
                'is_active'          => false,
                'winner_id'          => $winningBid?->user_id,
                'winning_bid_amount' => $winningBid?->amount ?? $lot->current_bid,
                'sold_at'            => $soldAt,
            ]);

            Log::info('LotSaleService: lot updated', [
                'lot_id'             => $lot->id,
                'winner_id'          => $lot->winner_id,
                'winning_bid_amount' => $lot->winning_bid_amount,
                'sold_at'            => $soldAt,
            ]);

            // ── Step 3 & 4: mark is_winner on bids ───────────────────────
            if ($winningBid) {
                // Mark the winning bid
                Bid::where('id', $winningBid->id)
                    ->update(['is_winner' => true, 'status' => Bid::STATUS_WINNING, 'is_winning' => true]);

                // Mark all other bids for this lot as not-winner
                Bid::where('lot_id', $lot->id)
                    ->where('id', '!=', $winningBid->id)
                    ->update(['is_winner' => false, 'is_winning' => false]);

                Log::info('LotSaleService: bid winner flags updated', [
                    'winning_bid_id' => $winningBid->id,
                ]);
            }

            // ── Steps 5 & 6: broadcast and auto-end ──────────────────────
            DB::afterCommit(function () use ($lot) {
                Log::info('LotSaleService: dispatching LotSold event', ['lot_id' => $lot->id]);
                LotSold::dispatch($lot->fresh(['winner', 'auction']));

                Log::info('LotSaleService: checking if auction should auto-end', [
                    'auction_id' => $lot->auction_id,
                ]);
                $this->maybeEndAuction($lot->auction_id);
            });
        });

        Log::info('LotSaleService: markAsSold complete', ['lot_id' => $lot->id]);

        return $lot->fresh(['winner', 'auction']);
    }

    /**
     * Auto-end the parent auction when no live or published lots remain.
     */
    private function maybeEndAuction(int $auctionId): void
    {
        $pending = Lot::where('auction_id', $auctionId)
            ->whereIn('status', [Lot::STATUS_LIVE, Lot::STATUS_PUBLISHED])
            ->exists();

        if ($pending) {
            Log::info('LotSaleService: active lots remain, auction continues', [
                'auction_id' => $auctionId,
            ]);
            return;
        }

        $auction = Auction::find($auctionId);
        if (! $auction || $auction->status === Auction::STATUS_ENDED) {
            return;
        }

        Log::info('LotSaleService: auto-ending auction', ['auction_id' => $auctionId]);

        $auction->update([
            'status'  => Auction::STATUS_ENDED,
            'is_live' => false,
        ]);

        Log::info('LotSaleService: dispatching AuctionEnded event', ['auction_id' => $auctionId]);
        AuctionEnded::dispatch($auction->fresh());
    }
}
