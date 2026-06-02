<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ValueMyPiano\StoreValueMyPianoRequest;
use App\Services\ValueMyPianoService;
use Illuminate\Http\JsonResponse;

class ValueMyPianoController extends Controller
{
    public function __construct(private readonly ValueMyPianoService $service) {}

    public function store(StoreValueMyPianoRequest $request): JsonResponse
    {
        $data       = $request->except('images');
        $imageFiles = $request->file('images', []);

        $valuation = $this->service->store($data, $imageFiles);

        return response()->json([
            'status'  => 'success',
            'message' => 'Your piano valuation request has been submitted successfully.',
            'data'    => $valuation,
        ], 201);
    }

    public function options(): JsonResponse
    {
        return response()->json([
            'valuation_types' => [
                'Auction Valuation',
                'Insurance Valuation',
                'Probate Valuation',
                'Private Sale Valuation',
            ],
            'piano_types' => [
                'Upright Piano',
                'Grand Piano',
                'Baby Grand Piano',
                'Digital Piano',
                'Player Piano',
                'Other',
            ],
        ]);
    }
}
