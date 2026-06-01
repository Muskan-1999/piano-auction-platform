<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SellMyPiano\StoreSellMyPianoRequest;
use App\Http\Resources\SellMyPianoResource;
use App\Services\SellMyPianoService;
use Illuminate\Http\JsonResponse;

class SellMyPianoController extends Controller
{
    public function __construct(private readonly SellMyPianoService $service) {}

    public function store(StoreSellMyPianoRequest $request): JsonResponse
    {
        $data       = $request->except('images');
        $imageFiles = $request->file('images', []);

        $submission = $this->service->store($data, $imageFiles);

        return response()->json([
            'status'  => 'success',
            'message' => 'Your piano valuation request has been submitted successfully.',
            'data'    => new SellMyPianoResource($submission),
        ], 201);
    }
}
