<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliveryQuote\StoreDeliveryQuoteRequest;
use App\Models\DeliveryQuote;
use Illuminate\Http\JsonResponse;

class DeliveryQuoteController extends Controller
{
    public function store(StoreDeliveryQuoteRequest $request): JsonResponse
    {
        $quote = DeliveryQuote::create($request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Your delivery quote request has been received. We will be in touch shortly.',
            'data'    => $quote,
        ], 201);
    }
}
