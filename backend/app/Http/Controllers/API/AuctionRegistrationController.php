<?php

namespace App\Http\Controllers\API;

use App\Actions\ApproveRegistrationAction;
use App\Actions\RejectRegistrationAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuctionRegistration\StoreAuctionRegistrationRequest;
use App\Http\Resources\AuctionRegistrationResource;
use App\Models\Auction;
use App\Models\AuctionRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuctionRegistrationController extends Controller
{
    public function store(StoreAuctionRegistrationRequest $request): JsonResponse
    {
        $user = $request->user();
        $auctionId = $request->input('auction_id');

        if ($user->auctionRegistrations()->where('auction_id', $auctionId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an application for this auction.',
            ], 409);
        }

        $registration = AuctionRegistration::create([
            'user_id' => $user->id,
            'auction_id' => $auctionId,
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'country' => $request->input('country'),
            'government_id_path' => $request->file('government_id')->store('registration_docs', 'public'),
            'proof_of_address_path' => $request->file('proof_of_address')->store('registration_docs', 'public'),
            'status' => AuctionRegistration::STATUS_PENDING,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration submitted successfully. You will be notified once approved.',
            'data' => new AuctionRegistrationResource($registration->load(['auction', 'user'])),
        ], 201);
    }

    public function userRegistrations(Request $request): JsonResponse
    {
        $registrations = $request->user()->auctionRegistrations()->with('auction')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => AuctionRegistrationResource::collection($registrations),
        ]);
    }

    public function check(Request $request, Auction $auction): JsonResponse
    {
        $registration = $request->user()->auctionRegistrations()
            ->where('auction_id', $auction->id)
            ->first();

        return response()->json([
            'success' => true,
            'registered' => (bool) $registration,
            'status' => $registration?->status,
            'approved' => $registration?->status === AuctionRegistration::STATUS_APPROVED,
            'registration_id' => $registration?->id,
        ]);
    }

    public function index(): JsonResponse
    {
        $this->authorize('viewAny', AuctionRegistration::class);

        $registrations = AuctionRegistration::with(['auction', 'user', 'approver'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => AuctionRegistrationResource::collection($registrations),
        ]);
    }

    public function approve(
        Request $request,
        AuctionRegistration $auctionRegistration,
        ApproveRegistrationAction $action
    ): JsonResponse {
        $this->authorize('approve', $auctionRegistration);

        $registration = $action->execute($auctionRegistration, $request->user());

        return response()->json([
            'success' => true,
            'message' => 'Registration approved. Bidder has been notified.',
            'data' => new AuctionRegistrationResource($registration->load(['auction', 'user', 'approver'])),
        ]);
    }

    public function reject(
        Request $request,
        AuctionRegistration $auctionRegistration,
        RejectRegistrationAction $action
    ): JsonResponse {
        $this->authorize('reject', $auctionRegistration);

        $registration = $action->execute($auctionRegistration, $request->user());

        return response()->json([
            'success' => true,
            'message' => 'Registration rejected.',
            'data' => new AuctionRegistrationResource($registration->load(['auction', 'user', 'approver'])),
        ]);
    }
}
