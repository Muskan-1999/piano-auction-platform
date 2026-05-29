<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicAuctionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'banner_image' => $this->banner_image ? url('storage/' . $this->banner_image) : null,
            'auction_type' => $this->auction_type,
            'preview_start_time' => $this->preview_start_time?->toDateTimeString(),
            'start_time' => $this->start_time?->toDateTimeString(),
            'end_time' => $this->end_time?->toDateTimeString(),
            'status' => $this->status,
            'location' => $this->location,
            'is_featured' => $this->is_featured,
            'is_live' => $this->is_live,
            'visible_lot_count' => $this->lots_count ?? null,
            'time_until_start' => $this->start_time ? max(0, now()->diffInSeconds($this->start_time, false)) : null,
            'time_until_end' => $this->end_time ? max(0, now()->diffInSeconds($this->end_time, false)) : null,
            'auction_lots' => PublicLotResource::collection($this->whenLoaded('lots')),
        ];
    }
}
