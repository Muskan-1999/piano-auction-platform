<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lot\StoreLotRequest;
use App\Http\Requests\Lot\UpdateLotRequest;
use App\Http\Resources\LotCollection;
use App\Http\Resources\LotResource;
use App\Models\Auction;
use App\Models\Lot;
use App\Services\LotService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LotController extends Controller
{
    public function __construct(private LotService $lotService)
    {
    }

    public function indexByAuction(Request $request, Auction $auction): LotCollection
    {
        $lots = $auction->lots()
            ->with('auction')
            ->published()
            ->orderBy('lot_number', 'asc')
            ->paginate(20);

        return new LotCollection($lots);
    }

    public function index(Request $request): LotCollection
    {
        $lots = Lot::with('auction')
            ->published()
            ->when($request->string('status'), fn ($query, $status) => $query->where('status', $status))
            ->when($request->string('auction_id'), fn ($query, $auctionId) => $query->where('auction_id', $auctionId))
            ->orderBy('lot_number', 'asc')
            ->paginate(20);

        return new LotCollection($lots);
    }

    public function store(StoreLotRequest $request, Auction $auction): JsonResponse
    {
        $lot = $this->lotService->create($auction->id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Lot created successfully',
            'data' => new LotResource($lot->load('auction')),
        ], 201);
    }

    public function show(Lot $lot): LotResource
    {
        return new LotResource($lot->load('auction'));
    }

    public function update(UpdateLotRequest $request, Lot $lot): JsonResponse
    {
        $lot = $this->lotService->update($lot, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Lot updated successfully',
            'data' => new LotResource($lot->load('auction')),
        ]);
    }

    public function destroy(Lot $lot): JsonResponse
    {
        $this->lotService->delete($lot);

        return response()->json([
            'success' => true,
            'message' => 'Lot deleted successfully',
        ]);
    }

    public function changeStatus(Request $request, Lot $lot): JsonResponse
    {
        $request->validate(['status' => ['required', 'string', 'in:draft,published,live,sold,unsold,withdrawn']]);

        $lot = $this->lotService->changeStatus($lot, $request->string('status'));

        return response()->json([
            'success' => true,
            'message' => 'Lot status updated successfully',
            'data' => new LotResource($lot->load('auction')),
        ]);
    }

    public function live(Request $request): LotCollection
    {
        $lots = Lot::with('auction')
            ->live()
            ->active()
            ->orderBy('lot_number', 'asc')
            ->paginate(20);

        return new LotCollection($lots);
    }
}
