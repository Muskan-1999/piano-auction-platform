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

    public function upcoming(): JsonResponse
    {
        $auction = Auction::upcoming()->with('lots')->first();

        if (!$auction) {
            return response()->json(['auction' => null, 'message' => 'Catalogue Available Soon.']);
        }

        return response()->json([
            'id'            => $auction->id,
            'title'         => $auction->title,
            'start_time'    => $auction->start_time,
            'end_time'      => $auction->end_time,
            'catalogue_pdf' => $auction->catalogue_pdf
                                ? asset('storage/' . $auction->catalogue_pdf)
                                : null,
            'lots'          => $auction->lots->map(fn ($lot) => [
                'id'             => $lot->id,
                'title'          => $lot->title,
                'slug'           => $lot->slug,
                'lot_number'     => $lot->lot_number,
                'brand'          => $lot->brand,
                'model'          => $lot->model,
                'year'           => $lot->year,
                'condition'      => $lot->condition,
                'starting_bid'   => $lot->starting_bid,
                'reserve_price'  => $lot->reserve_price,
                'featured_image' => $lot->featured_image
                                     ? asset('storage/' . $lot->featured_image)
                                     : null,
                'gallery'        => $lot->gallery ?? [],
                'description'    => $lot->description,
                'status'         => $lot->status,
            ]),
        ]);
    }

    public function downloadCatalogue(): JsonResponse|\Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $auction = Auction::upcoming()->first();

        if (!$auction || !$auction->catalogue_pdf) {
            return response()->json(['error' => 'No catalogue available.'], 404);
        }

        $path = storage_path('app/public/' . $auction->catalogue_pdf);

        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        return response()->download($path);
    }

    public function past(): JsonResponse
    {
        $auctions = Auction::completed()->with('lots')->get();

        return response()->json($auctions->map(fn ($auction) => [
            'id'           => $auction->id,
            'title'        => $auction->title,
            'slug'         => $auction->slug,
            'start_time'   => $auction->start_time,
            'end_time'     => $auction->end_time,
            'banner_image' => $auction->banner_image
                                ? asset('storage/' . $auction->banner_image)
                                : null,
            'lots'         => $auction->lots->map(fn ($lot) => [
                'id'                 => $lot->id,
                'title'              => $lot->title,
                'slug'               => $lot->slug,
                'lot_number'         => $lot->lot_number,
                'brand'              => $lot->brand,
                'featured_image'     => $lot->featured_image
                                         ? asset('storage/' . $lot->featured_image)
                                         : null,
                'starting_bid'       => $lot->starting_bid,
                'winning_bid_amount' => $lot->winning_bid_amount,
                'sold_at'            => $lot->sold_at,
                'status'             => $lot->status,
            ]),
        ]));
    }
}
