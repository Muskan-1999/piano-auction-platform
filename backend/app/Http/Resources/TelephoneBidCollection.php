<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TelephoneBidCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => TelephoneBidResource::collection($this->collection),
        ];
    }
}
