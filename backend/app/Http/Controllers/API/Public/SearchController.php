<?php

namespace App\Http\Controllers\API\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicAuctionCollection;
use App\Http\Resources\PublicLotCollection;
use App\Services\PublicCatalogService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(private PublicCatalogService $catalogService)
    {
    }

    public function index(Request $request)
    {
        $results = $this->catalogService->search($request);

        return response()->json([
            'success' => true,
            'data' => [
                'auctions' => (new PublicAuctionCollection($results['auctions']))->resolve($request),
                'lots' => (new PublicLotCollection($results['lots']))->resolve($request),
            ],
        ]);
    }
}
