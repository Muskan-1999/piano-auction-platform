<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TelephoneBidResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'lot_id' => $this->lot_id,
            'user_id' => $this->user_id,
            'guest_name' => $this->guest_name,
            'bidder_name' => $this->bidder_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'city' => $this->city,
            'postcode' => $this->postcode,
            'country' => $this->country,
            'max_bid_amount' => $this->max_bid_amount,
            'status' => $this->status,
            'notes' => $this->notes,
            'approved_by' => $this->approved_by,
            'lot' => new LotResource($this->whenLoaded('lot')),
            'user' => new UserResource($this->whenLoaded('user')),
            'approver' => new UserResource($this->whenLoaded('approver')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
