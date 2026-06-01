<?php

namespace App\Events;

use App\Models\AuctionRegistration;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RegistrationApproved implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public bool $afterCommit = true;

    public AuctionRegistration $registration;

    public function __construct(AuctionRegistration $registration)
    {
        $this->registration = $registration;
    }

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('user.' . $this->registration->user_id);
    }

    public function broadcastWith(): array
    {
        return [
            'registration' => [
                'id' => $this->registration->id,
                'auction_id' => $this->registration->auction_id,
                'status' => $this->registration->status,
                'auction' => [
                    'id' => $this->registration->auction->id ?? null,
                    'title' => $this->registration->auction->title ?? null,
                    'slug' => $this->registration->auction->slug ?? null,
                ],
            ],
        ];
    }

    public function broadcastAs(): string
    {
        return 'registration.approved';
    }
}
