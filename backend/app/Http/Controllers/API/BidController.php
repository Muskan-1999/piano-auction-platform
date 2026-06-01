<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Bid\PlaceBidRequest;
use App\Http\Resources\BidCollection;
use App\Http\Resources\BidResource;
use App\Models\Bid;
use App\Models\Lot;
use App\Services\BidService;
use Illuminate\Http\JsonResponse;

class BidController extends Controller
{
    public function __construct(protected BidService $bidService)
    {
    }

    public function index(): BidCollection
    {
        return new BidCollection($this->bidService->getAllBids());
    }

    public function store(PlaceBidRequest $request, Lot $lot): JsonResponse
    {
        $bid = $this->bidService->placeBid(
            $lot,
            $request->user(),
            (float) $request->input('amount'),
            $request->input('bid_type'),
            $request->ip(),
            $request->userAgent(),
        );

        return response()->json([
            'success' => true,
            'message' => 'Bid placed successfully.',
            'data' => new BidResource($bid),
        ], 201);
    }

    public function indexByLot(Lot $lot): BidCollection
    {
        return new BidCollection($this->bidService->getLotHistory($lot));
    }

    public function show(Bid $bid): BidResource
    {
        return new BidResource($bid->load(['lot', 'user']));
    }

    public function userBids(): BidCollection
    {
        return new BidCollection($this->bidService->getUserBids(auth()->user()));
    }

    public function destroy(Bid $bid): JsonResponse
    {
        $bid->delete();

        return response()->json([
            'success' => true,
            'message' => 'Bid deleted successfully.',
        ]);
    }
}
