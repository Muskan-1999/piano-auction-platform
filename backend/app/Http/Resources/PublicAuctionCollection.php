<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PublicAuctionCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => PublicAuctionResource::collection($this->collection),
        ];
    }
}
