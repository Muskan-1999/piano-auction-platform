<?php

namespace App\Services;

use App\Models\Auction;
use App\Models\Lot;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PublicCatalogService
{
    private array $visibleAuctionStatuses = [
        Auction::STATUS_UPCOMING,
        Auction::STATUS_LIVE,
    ];

    private array $visibleLotStatuses = [
        Lot::STATUS_PUBLISHED,
        Lot::STATUS_LIVE,
    ];

    public function getHomepageData(int $auctionLimit = 4, int $lotLimit = 8): array
    {
        $featuredAuctions = Auction::query()
            ->where('is_featured', true)
            ->whereIn('status', $this->visibleAuctionStatuses)
            ->withCount(['lots' => function (Builder $query) {
                $query->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true);
            }])
            ->orderByDesc('start_time')
            ->take($auctionLimit)
            ->get();

        $featuredLots = Lot::query()
            ->whereIn('status', $this->visibleLotStatuses)
            ->where('is_active', true)
            ->whereHas('auction', function (Builder $query) {
                $query->where('is_featured', true)
                    ->whereIn('status', $this->visibleAuctionStatuses);
            })
            ->with('auction')
            ->orderByDesc('current_bid')
            ->take($lotLimit)
            ->get();

        $liveAuctions = Auction::live()
            ->withCount(['lots' => function (Builder $query) {
                $query->where('status', Lot::STATUS_LIVE)
                    ->where('is_active', true);
            }])
            ->with('creator')
            ->orderBy('start_time')
            ->get();

        return [
            'featuredAuctions' => $featuredAuctions,
            'featuredLots' => $featuredLots,
            'liveAuctions' => $liveAuctions,
        ];
    }

    public function listAuctions(Request $request, int $perPage = 20): LengthAwarePaginator
    {
        $query = Auction::query()
            ->withCount(['lots' => function (Builder $query) {
                $query->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true);
            }])
            ->with('creator');

        $this->applyAuctionFilters($query, $request);

        return $query->paginate($this->safePerPage($request, $perPage));
    }

    public function listFeaturedAuctions(Request $request, int $perPage = 20): LengthAwarePaginator
    {
        $request->merge(['featured' => true]);

        return $this->listAuctions($request, $perPage);
    }

    public function getAuctionBySlug(string $slug): Auction
    {
        return Auction::query()
            ->where('slug', $slug)
            ->whereIn('status', $this->visibleAuctionStatuses)
            ->with(['lots' => function (Builder $query) {
                $query->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true)
                    ->orderBy('lot_number');
            }])
            ->firstOrFail();
    }

    public function listLiveAuctions(Request $request, int $perPage = 20): LengthAwarePaginator
    {
        $query = Auction::query()
            ->live()
            ->withCount(['lots' => function (Builder $query) {
                $query->where('status', Lot::STATUS_LIVE)
                    ->where('is_active', true);
            }])
            ->with('creator');

        $query->when($request->filled('auction_type'), function (Builder $query) use ($request) {
            $query->where('auction_type', $request->string('auction_type'));
        });

        return $query->paginate($this->safePerPage($request, $perPage));
    }

    public function listLots(Request $request, int $perPage = 20): LengthAwarePaginator
    {
        $query = Lot::query()
            ->whereIn('status', $this->visibleLotStatuses)
            ->where('is_active', true)
            ->with('auction');

        $this->applyLotFilters($query, $request);

        return $query->paginate($this->safePerPage($request, $perPage));
    }

    public function getLotBySlug(string $slug): Lot
    {
        return Lot::query()
            ->where('slug', $slug)
            ->whereIn('status', $this->visibleLotStatuses)
            ->where('is_active', true)
            ->with('auction')
            ->firstOrFail();
    }

    public function search(Request $request, int $perPage = 10): array
    {
        $auctions = Auction::query()
            ->whereIn('status', $this->visibleAuctionStatuses)
            ->withCount(['lots' => function (Builder $query) {
                $query->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true);
            }])
            ->with('creator');

        $lots = Lot::query()
            ->whereIn('status', $this->visibleLotStatuses)
            ->where('is_active', true)
            ->with('auction');

        if ($request->filled('q')) {
            $term = '%' . $request->string('q') . '%';

            $auctions->where(function (Builder $query) use ($term) {
                $query->where('title', 'like', $term)
                    ->orWhere('description', 'like', $term)
                    ->orWhere('location', 'like', $term);
            });

            $lots->where(function (Builder $query) use ($term) {
                $query->where('title', 'like', $term)
                    ->orWhere('description', 'like', $term)
                    ->orWhere('brand', 'like', $term)
                    ->orWhere('model', 'like', $term);
            });
        }

        if ($request->filled('auction_status')) {
            $auctions->where('status', $request->string('auction_status')); 
            $lots->whereHas('auction', function (Builder $query) use ($request) {
                $query->where('status', $request->string('auction_status'));
            });
        }

        if ($request->filled('brand')) {
            $lots->where('brand', 'like', '%' . $request->string('brand') . '%');
        }

        if ($request->filled('min_price')) {
            $lots->where('current_bid', '>=', $request->float('min_price'));
        }

        if ($request->filled('max_price')) {
            $lots->where('current_bid', '<=', $request->float('max_price'));
        }

        return [
            'auctions' => $auctions->paginate($this->safePerPage($request, $perPage)),
            'lots' => $lots->paginate($this->safePerPage($request, $perPage)),
        ];
    }

    private function applyAuctionFilters(Builder $query, Request $request): void
    {
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        } else {
            $query->whereIn('status', $this->visibleAuctionStatuses);
        }

        if ($request->filled('auction_type')) {
            $query->where('auction_type', $request->string('auction_type'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->boolean('live')) {
            $query->where('status', Auction::STATUS_LIVE);
        }

        if ($request->filled('min_price')) {
            $query->whereHas('lots', function (Builder $query) use ($request) {
                $query->where('current_bid', '>=', $request->float('min_price'))
                    ->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true);
            });
        }

        if ($request->filled('max_price')) {
            $query->whereHas('lots', function (Builder $query) use ($request) {
                $query->where('current_bid', '<=', $request->float('max_price'))
                    ->whereIn('status', $this->visibleLotStatuses)
                    ->where('is_active', true);
            });
        }

        if ($request->filled('q')) {
            $term = '%' . $request->string('q') . '%';
            $query->where(function (Builder $query) use ($term) {
                $query->where('title', 'like', $term)
                    ->orWhere('description', 'like', $term)
                    ->orWhere('location', 'like', $term);
            });
        }

        $query->orderBy(
            $this->safeSortBy($request->string('sort_by', 'start_time'), ['start_time', 'end_time', 'created_at', 'title', 'status']),
            $this->safeSortOrder($request->string('sort_order', 'desc'))
        );
    }

    private function applyLotFilters(Builder $query, Request $request): void
    {
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('brand')) {
            $query->where('brand', 'like', '%' . $request->string('brand') . '%');
        }

        if ($request->filled('auction_type')) {
            $query->whereHas('auction', function (Builder $query) use ($request) {
                $query->where('auction_type', $request->string('auction_type'));
            });
        }

        if ($request->filled('auction_status')) {
            $query->whereHas('auction', function (Builder $query) use ($request) {
                $query->where('status', $request->string('auction_status'));
            });
        }

        if ($request->boolean('featured')) {
            $query->whereHas('auction', function (Builder $query) {
                $query->where('is_featured', true);
            });
        }

        if ($request->boolean('live')) {
            $query->where('status', Lot::STATUS_LIVE);
        }

        if ($request->filled('min_price')) {
            $query->where('current_bid', '>=', $request->float('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('current_bid', '<=', $request->float('max_price'));
        }

        if ($request->filled('q')) {
            $term = '%' . $request->string('q') . '%';
            $query->where(function (Builder $query) use ($term) {
                $query->where('title', 'like', $term)
                    ->orWhere('description', 'like', $term)
                    ->orWhere('brand', 'like', $term)
                    ->orWhere('model', 'like', $term);
            });
        }

        $query->orderBy(
            $this->safeSortBy($request->string('sort_by', 'lot_number'), ['current_bid', 'starting_bid', 'ends_at', 'lot_number', 'title']),
            $this->safeSortOrder($request->string('sort_order', 'asc'))
        );
    }

    private function safeSortBy(string $sortBy, array $allowed, string $default = 'start_time'): string
    {
        return in_array($sortBy, $allowed, true) ? $sortBy : $default;
    }

    private function safeSortOrder(string $sortOrder): string
    {
        return strtolower($sortOrder) === 'asc' ? 'asc' : 'desc';
    }

    private function safePerPage(Request $request, int $default): int
    {
        $perPage = (int) $request->input('per_page', $default);

        return $perPage > 0 && $perPage <= 100 ? $perPage : $default;
    }
}
