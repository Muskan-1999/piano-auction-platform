<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lot;
use App\Models\Watchlist;
use Illuminate\Http\JsonResponse;

class WatchlistController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Watchlist::with(['lot' => function ($q) {
            $q->with(['auction' => function ($q) {
                $q->select('id', 'title', 'slug', 'status', 'start_time', 'end_time');
            }])->withCount('bids');
        }])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items->map(function (Watchlist $item) {
                $lot = $item->lot;
                return [
                    'id' => $item->id,
                    'lot_id' => $item->lot_id,
                    'lot' => $lot ? [
                        'id' => $lot->id,
                        'title' => $lot->title,
                        'slug' => $lot->slug,
                        'lot_number' => $lot->lot_number,
                        'brand' => $lot->brand,
                        'model' => $lot->model,
                        'current_bid' => $lot->current_bid,
                        'starting_bid' => $lot->starting_bid,
                        'bid_increment' => $lot->bid_increment,
                        'reserve_price' => $lot->reserve_price,
                        'status' => $lot->status,
                        'ends_at' => $lot->ends_at?->toDateTimeString(),
                        'featured_image' => $lot->featured_image ? url('storage/' . $lot->featured_image) : null,
                        'bids_count' => $lot->bids_count,
                        'auction' => $lot->auction ? [
                            'id' => $lot->auction->id,
                            'title' => $lot->auction->title,
                            'slug' => $lot->auction->slug,
                            'status' => $lot->auction->status,
                            'start_time' => $lot->auction->start_time?->toDateTimeString(),
                            'end_time' => $lot->auction->end_time?->toDateTimeString(),
                        ] : null,
                    ] : null,
                    'created_at' => $item->created_at?->toDateTimeString(),
                ];
            }),
        ]);
    }

    public function store(Lot $lot): JsonResponse
    {
        $existing = Watchlist::where('user_id', auth()->id())
            ->where('lot_id', $lot->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Lot is already in your watchlist.',
            ], 409);
        }

        Watchlist::create([
            'user_id' => auth()->id(),
            'lot_id' => $lot->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lot added to watchlist.',
        ], 201);
    }

    public function destroy(Lot $lot): JsonResponse
    {
        Watchlist::where('user_id', auth()->id())
            ->where('lot_id', $lot->id)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lot removed from watchlist.',
        ]);
    }

    public function check(Lot $lot): JsonResponse
    {
        $inWatchlist = Watchlist::where('user_id', auth()->id())
            ->where('lot_id', $lot->id)
            ->exists();

        return response()->json([
            'success' => true,
            'in_watchlist' => $inWatchlist,
        ]);
    }
}
