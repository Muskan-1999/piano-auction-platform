<?php

namespace App\Listeners;

use App\Events\LotSold;
use App\Mail\LosingBidderMail;
use App\Mail\WinnerNotificationMail;
use App\Models\Bid;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class HandleLotSold
{
    public function handle(LotSold $event): void
    {
        $lot = $event->lot;

        // ── Winner email ──────────────────────────────────────────────────
        if ($lot->winner_id && $lot->winner) {
            Mail::to($lot->winner->email)
                ->queue(new WinnerNotificationMail($lot));
        }

        // ── Losing bidders email ──────────────────────────────────────────
        $loserIds = Bid::where('lot_id', $lot->id)
            ->whereNotNull('user_id')
            ->when($lot->winner_id, fn ($q) => $q->where('user_id', '!=', $lot->winner_id))
            ->distinct()
            ->pluck('user_id');

        foreach ($loserIds as $userId) {
            $user = User::find($userId);
            if ($user) {
                Mail::to($user->email)
                    ->queue(new LosingBidderMail($lot, $user));
            }
        }
    }
}
