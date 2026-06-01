<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LotResource extends JsonResource
{
    private bool $includeReserve = false;

    public function __construct($resource, bool $includeReserve = false)
    {
        parent::__construct($resource);
        $this->includeReserve = $includeReserve;
    }

    public function toArray($request): array
    {
        $data = [
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
            'gallery' => $this->gallery ? array_map(fn ($img) => url('storage/' . $img), $this->gallery) : [],
            'ends_at' => $this->ends_at?->toDateTimeString(),
            'status' => $this->status,
            'is_active' => $this->is_active,
            'auction' => new AuctionResource($this->whenLoaded('auction')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];

        if ($this->includeReserve || $request->user()?->isAdmin()) {
            $data['reserve_price'] = $this->reserve_price;
        }

        return $data;
    }
}
