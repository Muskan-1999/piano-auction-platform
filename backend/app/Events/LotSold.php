<?php

namespace App\Events;

use App\Models\Lot;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LotSold implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public bool $afterCommit = true;

    public Lot $lot;

    public function __construct(Lot $lot)
    {
        $this->lot = $lot->loadMissing(['winner', 'auction']);
    }

    /** Broadcast on both the lot channel and the parent auction channel. */
    public function broadcastOn(): array
    {
        return [
            new Channel('lots.' . $this->lot->id),
            new Channel('auctions.' . $this->lot->auction_id),
        ];
    }

    public function broadcastWith(): array
    {
        $winner = $this->lot->winner;
        $masked = $winner ? $this->maskName($winner->name) : null;

        return [
            'lot' => [
                'id'                 => $this->lot->id,
                'lot_number'         => $this->lot->lot_number,
                'title'              => $this->lot->title,
                'status'             => $this->lot->status,
                'current_bid'        => $this->lot->current_bid,
                'winning_bid_amount' => $this->lot->winning_bid_amount,
                'winner_id'          => $this->lot->winner_id,
                'winner_masked'      => $masked,
            ],
            'auction_id' => $this->lot->auction_id,
        ];
    }

    public function broadcastAs(): string
    {
        return 'lot.sold';
    }

    private function maskName(string $name): string
    {
        $parts = array_filter(explode(' ', $name));
        $first = $parts[array_key_first($parts)] ?? '';
        $last  = $parts[array_key_last($parts)]  ?? '';
        return mb_strtoupper(mb_substr($first, 0, 1))
            . '***'
            . mb_strtoupper(mb_substr($last,  0, 1));
    }
}
