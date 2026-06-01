<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbsenteeBid\ApproveAbsenteeBidRequest;
use App\Http\Requests\AbsenteeBid\RejectAbsenteeBidRequest;
use App\Http\Requests\AbsenteeBid\StoreAbsenteeBidRequest;
use App\Http\Requests\AbsenteeBid\UpdateAbsenteeBidRequest;
use App\Http\Resources\AbsenteeBidCollection;
use App\Http\Resources\AbsenteeBidResource;
use App\Models\AbsenteeBid;
use App\Models\Lot;
use App\Services\AbsenteeBidService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AbsenteeBidController extends Controller
{
    public function __construct(private AbsenteeBidService $absenteeBidService)
    {
    }

    public function index(Request $request): AbsenteeBidCollection
    {
        $this->authorize('viewAny', AbsenteeBid::class);

        return new AbsenteeBidCollection($this->absenteeBidService->getAll());
    }

    public function store(StoreAbsenteeBidRequest $request): JsonResponse
    {
        $data = $request->validated();

        $lot = Lot::where('lot_number', $data['lot_1_number'])->first();

        AbsenteeBid::create([
            'lot_id'            => $lot?->id,
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
            'max_bid_per_lot'   => $data['max_bid_per_lot'] ?? null,
            'max_bid_amount'    => $data['max_bid_per_lot'] ?? 0,
            'currency'          => $data['currency'] ?? 'GBP',
            'one_piano_only'    => $data['one_piano_only'],
            'status'            => AbsenteeBid::STATUS_PENDING,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your bid has been submitted successfully. We will be in touch shortly.',
        ], 201);
    }

    public function approve(ApproveAbsenteeBidRequest $request, AbsenteeBid $absenteeBid): JsonResponse
    {
        $this->authorize('approve', $absenteeBid);

        $absenteeBid = $this->absenteeBidService->approve(
            $absenteeBid,
            $request->user(),
            $request->input('notes'),
        );

        return response()->json([
            'success' => true,
            'message' => 'Absentee bid request approved.',
            'data' => new AbsenteeBidResource($absenteeBid->load(['lot', 'user', 'approver'])),
        ]);
    }

    public function reject(RejectAbsenteeBidRequest $request, AbsenteeBid $absenteeBid): JsonResponse
    {
        $this->authorize('reject', $absenteeBid);

        $absenteeBid = $this->absenteeBidService->reject(
            $absenteeBid,
            $request->user(),
            $request->input('notes'),
        );

        return response()->json([
            'success' => true,
            'message' => 'Absentee bid request rejected.',
            'data' => new AbsenteeBidResource($absenteeBid->load(['lot', 'user', 'approver'])),
        ]);
    }

    public function update(UpdateAbsenteeBidRequest $request, AbsenteeBid $absenteeBid): JsonResponse
    {
        $this->authorize('update', $absenteeBid);

        $absenteeBid = $this->absenteeBidService->update(
            $absenteeBid,
            $request->validated(),
            $request->user(),
        );

        return response()->json([
            'success' => true,
            'message' => 'Absentee bid request updated successfully.',
            'data' => new AbsenteeBidResource($absenteeBid->load(['lot', 'user', 'approver'])),
        ]);
    }
}
