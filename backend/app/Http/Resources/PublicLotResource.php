<?php

namespace App\Http\Resources;

use App\Models\Lot;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicLotResource extends JsonResource
{
    public function toArray($request): array
    {
        // Mask winner name for public display
        $winnerName = $this->winner?->name ?? '';
        $winnerMasked = $winnerName ? $this->maskName($winnerName) : null;

        return [
            'id'                 => $this->id,
            'auction_id'         => $this->auction_id,
            'title'              => $this->title,
            'slug'               => $this->slug,
            'lot_number'         => $this->lot_number,
            'description'        => $this->description,
            'brand'              => $this->brand,
            'model'              => $this->model,
            'serial_number'      => $this->serial_number,
            'year'               => $this->year,
            'condition'          => $this->condition,
            'starting_bid'       => $this->starting_bid,
            'current_bid'        => $this->current_bid,
            'bid_increment'      => $this->bid_increment,
            'reserve_price'      => $this->reserve_price,
            'featured_image'     => $this->featured_image ? url('storage/' . $this->featured_image) : null,
            'gallery'            => $this->gallery
                ? array_map(fn ($img) => url('storage/' . $img), $this->gallery)
                : [],
            'ends_at'            => $this->ends_at?->toDateTimeString(),
            'sold_at'            => $this->sold_at?->toDateTimeString(),
            'status'             => $this->status,
            'is_active'          => $this->is_active,
            'is_live'            => $this->status === Lot::STATUS_LIVE,
            'is_sold'            => $this->status === Lot::STATUS_SOLD,
            'can_accept_bids'    => $this->canAcceptBids(),
            'bids_count'         => $this->bids_count ?? null,
            'time_until_end'     => $this->ends_at
                ? max(0, now()->diffInSeconds($this->ends_at, false))
                : null,
            // Winner info (masked for public)
            'winner_id'          => $this->winner_id,
            'winner_masked'      => $winnerMasked,
            'winning_bid_amount' => $this->winning_bid_amount,
            'auction'            => new PublicAuctionResource($this->whenLoaded('auction')),
        ];
    }

    private function maskName(string $name): string
    {
        $parts = array_filter(explode(' ', $name));
        $first = $parts[array_key_first($parts)] ?? '';
        $last  = $parts[array_key_last($parts)]  ?? '';
        return mb_strtoupper(mb_substr($first, 0, 1))
            . '***'
            . mb_strtoupper(mb_substr($last, 0, 1));
    }
}
