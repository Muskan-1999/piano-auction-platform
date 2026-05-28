<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuctionResource extends JsonResource
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
            'created_by' => $this->created_by,
            'creator' => new UserResource($this->whenLoaded('creator')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
