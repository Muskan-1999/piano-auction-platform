<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BidResource extends JsonResource
{
    public function toArray($request): array
    {
        $data = [
            'id' => $this->id,
            'lot_id' => $this->lot_id,
            'user_id' => $this->user_id,
            'amount' => $this->amount,
            'bid_type' => $this->bid_type,
            'status' => $this->status,
            'placed_at' => $this->placed_at?->toDateTimeString(),
            'is_winning' => $this->is_winning,
            'is_live_bid' => $this->is_live_bid,
            'lot' => new LotResource($this->whenLoaded('lot')),
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];

        if ($request->user()?->isAdmin() || $request->user()?->id === $this->user_id) {
            $data['ip_address'] = $this->ip_address;
            $data['user_agent'] = $this->user_agent;
        }

        return $data;
    }
}
