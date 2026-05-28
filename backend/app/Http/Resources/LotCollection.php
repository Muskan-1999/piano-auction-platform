<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LotCollection extends ResourceCollection
{
    private bool $includeReserve = false;

    public function __construct($resource, bool $includeReserve = false)
    {
        parent::__construct($resource);
        $this->includeReserve = $includeReserve;
    }

    public function toArray($request): array
    {
        return [
            'data' => $this->collection->map(function ($item) use ($request) {
                return new LotResource($item, $this->includeReserve);
            })->all(),
        ];
    }
}
