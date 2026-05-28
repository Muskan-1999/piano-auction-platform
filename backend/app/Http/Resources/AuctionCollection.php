<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AuctionCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => AuctionResource::collection($this->collection),
        ];
    }
}
