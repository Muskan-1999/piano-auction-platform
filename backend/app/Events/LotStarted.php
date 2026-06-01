<?php

namespace App\Events;

use App\Models\Lot;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LotStarted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public bool $afterCommit = true;

    public Lot $lot;

    public function __construct(Lot $lot)
    {
        $this->lot = $lot;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('lots.' . $this->lot->id);
    }

    public function broadcastWith(): array
    {
        return [
            'lot' => [
                'id' => $this->lot->id,
                'auction_id' => $this->lot->auction_id,
                'title' => $this->lot->title,
                'status' => $this->lot->status,
                'current_bid' => $this->lot->current_bid,
                'ends_at' => $this->lot->ends_at?->toDateTimeString(),
                'is_active' => $this->lot->is_active,
            ],
        ];
    }

    public function broadcastAs(): string
    {
        return 'lot.started';
    }
}
