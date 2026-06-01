<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auction\StoreAuctionRequest;
use App\Http\Requests\Auction\UpdateAuctionRequest;
use App\Http\Requests\Auction\UpdateAuctionStatusRequest;
use App\Http\Resources\AuctionCollection;
use App\Http\Resources\AuctionResource;
use App\Models\Auction;
use App\Services\AuctionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function __construct(private AuctionService $auctionService)
    {
    }

    public function index(Request $request): AuctionCollection
    {
        $auctions = Auction::with('creator')
            ->when($request->string('status'), fn ($query, $status) => $query->where('status', $status))
            ->when(! $request->has('status'), fn ($query) => $query->where('status', '!=', Auction::STATUS_DRAFT))
            ->orderBy('start_time', 'desc')
            ->paginate(15);

        return new AuctionCollection($auctions);
    }

    public function store(StoreAuctionRequest $request): JsonResponse
    {
        $auction = $this->auctionService->create($request->validated(), $request->user());

        return response()->json([
            'success' => true,
            'message' => 'Auction created successfully',
            'data' => new AuctionResource($auction->load('creator')),
        ], 201);
    }

    public function show(Auction $auction): AuctionResource
    {
        return new AuctionResource($auction->load('creator'));
    }

    public function update(UpdateAuctionRequest $request, Auction $auction): JsonResponse
    {
        $auction = $this->auctionService->update($auction, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Auction updated successfully',
            'data' => new AuctionResource($auction->load('creator')),
        ]);
    }

    public function destroy(Auction $auction): JsonResponse
    {
        $this->auctionService->delete($auction);

        return response()->json([
            'success' => true,
            'message' => 'Auction deleted successfully',
        ]);
    }

    public function updateStatus(UpdateAuctionStatusRequest $request, Auction $auction): JsonResponse
    {
        $auction = $this->auctionService->changeStatus($auction, $request->validated()['status']);

        return response()->json([
            'success' => true,
            'message' => 'Auction status updated successfully',
            'data' => new AuctionResource($auction->load('creator')),
        ]);
    }

    public function liveAuctions(): AuctionCollection
    {
        $auctions = Auction::with('creator')
            ->live()
            ->orderBy('start_time', 'desc')
            ->get();

        return new AuctionCollection($auctions);
    }
}
