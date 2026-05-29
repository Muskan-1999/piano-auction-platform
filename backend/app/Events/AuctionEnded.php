<?php

namespace App\Events;

use App\Models\Auction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AuctionEnded implements ShouldBroadcastAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Auction $auction;

    public function __construct(Auction $auction)
    {
        $this->auction = $auction;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('auctions.' . $this->auction->id),
            new Channel('live-auctions'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'auction' => [
                'id' => $this->auction->id,
                'title' => $this->auction->title,
                'status' => $this->auction->status,
                'is_live' => $this->auction->is_live,
                'end_time' => $this->auction->end_time?->toDateTimeString(),
            ],
        ];
    }

    public function broadcastAs(): string
    {
        return 'auction.ended';
    }
}
