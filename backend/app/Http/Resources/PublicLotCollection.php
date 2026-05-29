<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PublicLotCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => PublicLotResource::collection($this->collection),
        ];
    }
}
