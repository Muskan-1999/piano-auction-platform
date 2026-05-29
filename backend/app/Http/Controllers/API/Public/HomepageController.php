<?php

namespace App\Http\Controllers\API\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicAuctionResource;
use App\Http\Resources\PublicLotResource;
use App\Services\PublicCatalogService;

class HomepageController extends Controller
{
    public function __construct(private PublicCatalogService $catalogService)
    {
    }

    public function index()
    {
        $data = $this->catalogService->getHomepageData();

        return response()->json([
            'success' => true,
            'data' => [
                'featured_auctions' => PublicAuctionResource::collection($data['featuredAuctions']),
                'featured_lots' => PublicLotResource::collection($data['featuredLots']),
                'live_auctions' => PublicAuctionResource::collection($data['liveAuctions']),
            ],
        ]);
    }
}
