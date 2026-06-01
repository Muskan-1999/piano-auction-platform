<?php

namespace App\Http\Controllers\API\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicAuctionCollection;
use App\Http\Resources\PublicAuctionResource;
use App\Services\PublicCatalogService;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function __construct(private PublicCatalogService $catalogService)
    {
    }

    public function index(Request $request)
    {
        return (new PublicAuctionCollection($this->catalogService->listAuctions($request)))
            ->additional(['success' => true]);
    }

    public function featured(Request $request)
    {
        return (new PublicAuctionCollection($this->catalogService->listFeaturedAuctions($request)))
            ->additional(['success' => true]);
    }

    public function show(string $slug)
    {
        return (new PublicAuctionResource($this->catalogService->getAuctionBySlug($slug)))
            ->additional(['success' => true]);
    }

    public function live(Request $request)
    {
        return (new PublicAuctionCollection($this->catalogService->listLiveAuctions($request)))
            ->additional(['success' => true]);
    }
}
