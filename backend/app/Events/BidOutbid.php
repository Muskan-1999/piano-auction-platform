<?php

namespace App\Events;

use App\Models\Bid;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidOutbid implements ShouldBroadcastAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Bid $bid;

    public function __construct(Bid $bid)
    {
        $this->bid = $bid;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('lots.' . $this->bid->lot_id);
    }

    public function broadcastWith(): array
    {
        return [
            'bid' => [
                'id' => $this->bid->id,
                'lot_id' => $this->bid->lot_id,
                'user_id' => $this->bid->user_id,
                'amount' => $this->bid->amount,
                'status' => $this->bid->status,
                'is_winning' => $this->bid->is_winning,
            ],
        ];
    }

    public function broadcastAs(): string
    {
        return 'bid.outbid';
    }
}
