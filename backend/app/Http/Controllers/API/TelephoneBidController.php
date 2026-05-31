<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TelephoneBid\ApproveTelephoneBidRequest;
use App\Http\Requests\TelephoneBid\RejectTelephoneBidRequest;
use App\Http\Requests\TelephoneBid\StoreTelephoneBidRequest;
use App\Http\Requests\TelephoneBid\UpdateTelephoneBidRequest;
use App\Http\Resources\TelephoneBidCollection;
use App\Http\Resources\TelephoneBidResource;
use App\Models\Lot;
use App\Models\TelephoneBid;
use App\Services\TelephoneBidService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TelephoneBidController extends Controller
{
    public function __construct(private TelephoneBidService $telephoneBidService)
    {
    }

    public function index(Request $request): TelephoneBidCollection
    {
        $this->authorize('viewAny', TelephoneBid::class);

        return new TelephoneBidCollection($this->telephoneBidService->getAll());
    }

    public function store(StoreTelephoneBidRequest $request): JsonResponse
    {
        $data = $request->validated();
        $lot = Lot::where('lot_number', $data['lot_number'])->firstOrFail();

        $bid = $this->telephoneBidService->create([
            'lot_id' => $lot->id,
            'guest_name' => trim($data['first_name'] . ' ' . $data['last_name']),
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address_1' => $data['address'],
            'address_2' => $data['address_2'] ?? null,
            'city' => $data['city'] ?? '',
            'postcode' => $data['postcode'],
            'country' => $data['country'],
            'lot_description' => $data['description'],
            'preferred_call_time' => $data['preferred_call_time'] ?? null,
            'one_piano_only' => $data['one_piano_only'] === 'yes',
            'additional_notes' => $data['additional_notes'] ?? null,
        ], $request->user());

        return response()->json([
            'success' => true,
            'message' => 'Telephone bid request submitted successfully.',
            'data' => new TelephoneBidResource($bid->load(['lot', 'user', 'approver'])),
        ], 201);
    }

    public function approve(ApproveTelephoneBidRequest $request, TelephoneBid $telephoneBid): JsonResponse
    {
        $this->authorize('approve', $telephoneBid);

        $telephoneBid = $this->telephoneBidService->approve(
            $telephoneBid,
            $request->user(),
            $request->input('notes'),
        );

        return response()->json([
            'success' => true,
            'message' => 'Telephone bid request approved.',
            'data' => new TelephoneBidResource($telephoneBid->load(['lot', 'user', 'approver'])),
        ]);
    }

    public function reject(RejectTelephoneBidRequest $request, TelephoneBid $telephoneBid): JsonResponse
    {
        $this->authorize('reject', $telephoneBid);

        $telephoneBid = $this->telephoneBidService->reject(
            $telephoneBid,
            $request->user(),
            $request->input('notes'),
        );

        return response()->json([
            'success' => true,
            'message' => 'Telephone bid request rejected.',
            'data' => new TelephoneBidResource($telephoneBid->load(['lot', 'user', 'approver'])),
        ]);
    }

    public function update(UpdateTelephoneBidRequest $request, TelephoneBid $telephoneBid): JsonResponse
    {
        $this->authorize('update', $telephoneBid);

        $telephoneBid = $this->telephoneBidService->update(
            $telephoneBid,
            $request->validated(),
            $request->user(),
        );

        return response()->json([
            'success' => true,
            'message' => 'Telephone bid request updated successfully.',
            'data' => new TelephoneBidResource($telephoneBid->load(['lot', 'user', 'approver'])),
        ]);
    }
}
