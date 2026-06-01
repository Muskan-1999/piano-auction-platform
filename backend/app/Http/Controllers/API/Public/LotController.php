<?php

namespace App\Http\Controllers\API\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicLotCollection;
use App\Http\Resources\PublicLotResource;
use App\Services\PublicCatalogService;
use Illuminate\Http\Request;

class LotController extends Controller
{
    public function __construct(private PublicCatalogService $catalogService)
    {
    }

    public function index(Request $request)
    {
        return (new PublicLotCollection($this->catalogService->listLots($request)))
            ->additional(['success' => true]);
    }

    public function show(string $slug)
    {
        return (new PublicLotResource($this->catalogService->getLotBySlug($slug)))
            ->additional(['success' => true]);
    }
}
