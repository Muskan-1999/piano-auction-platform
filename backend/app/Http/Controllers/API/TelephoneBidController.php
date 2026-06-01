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

        $lot = Lot::where('lot_number', $data['lot_1_number'])->first();

        TelephoneBid::create([
            'lot_id'            => $lot->id,
            'guest_name'        => trim($data['first_name'] . ' ' . $data['last_name']),
            'first_name'        => $data['first_name'],
            'last_name'         => $data['last_name'],
            'email'             => $data['email'],
            'phone'             => $data['phone'],
            'address'           => $data['address'],
            'address_1'         => $data['address'],
            'city'              => '',
            'postcode'          => $data['post_code'],
            'post_code'         => $data['post_code'],
            'country'           => '',
            'lot_description'   => $data['lot_1_description'],
            'lot_1_number'      => $data['lot_1_number'],
            'lot_1_description' => $data['lot_1_description'],
            'lot_2_number'      => $data['lot_2_number'] ?? null,
            'lot_2_description' => $data['lot_2_description'] ?? null,
            'lot_3_number'      => $data['lot_3_number'] ?? null,
            'lot_3_description' => $data['lot_3_description'] ?? null,
            'lot_4_number'      => $data['lot_4_number'] ?? null,
            'lot_4_description' => $data['lot_4_description'] ?? null,
            'lot_5_number'      => $data['lot_5_number'] ?? null,
            'lot_5_description' => $data['lot_5_description'] ?? null,
            'one_piano_only'    => $data['one_piano_only'],
            'status'            => TelephoneBid::STATUS_PENDING,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your bid has been submitted successfully. We will be in touch shortly.',
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
