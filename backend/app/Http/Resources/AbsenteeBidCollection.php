<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AbsenteeBidCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => AbsenteeBidResource::collection($this->collection),
        ];
    }
}
