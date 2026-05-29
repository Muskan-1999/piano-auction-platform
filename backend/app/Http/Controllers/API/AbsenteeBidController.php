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
        $bid = $this->absenteeBidService->create($data, $request->user());

        return response()->json([
            'success' => true,
            'message' => 'Absentee bid request submitted successfully.',
            'data' => new AbsenteeBidResource($bid->load(['lot', 'user', 'approver'])),
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
