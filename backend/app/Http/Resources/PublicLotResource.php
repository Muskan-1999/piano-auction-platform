<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicLotResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'auction_id' => $this->auction_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'lot_number' => $this->lot_number,
            'description' => $this->description,
            'brand' => $this->brand,
            'model' => $this->model,
            'serial_number' => $this->serial_number,
            'year' => $this->year,
            'condition' => $this->condition,
            'starting_bid' => $this->starting_bid,
            'current_bid' => $this->current_bid,
            'bid_increment' => $this->bid_increment,
            'featured_image' => $this->featured_image ? url('storage/' . $this->featured_image) : null,
            'gallery' => $this->gallery ? array_map(fn ($image) => url('storage/' . $image), $this->gallery) : [],
            'ends_at' => $this->ends_at?->toDateTimeString(),
            'status' => $this->status,
            'is_active' => $this->is_active,
            'is_live' => $this->status === \App\Models\Lot::STATUS_LIVE,
            'current_highest_bid' => $this->current_bid,
            'time_until_end' => $this->ends_at ? max(0, now()->diffInSeconds($this->ends_at, false)) : null,
            'auction' => new PublicAuctionResource($this->whenLoaded('auction')),
        ];
    }
}
