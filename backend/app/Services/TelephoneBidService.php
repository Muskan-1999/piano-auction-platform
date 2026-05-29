<?php

namespace App\Services;

use App\Models\Lot;
use App\Models\TelephoneBid;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TelephoneBidService
{
    public function create(array $data, ?User $user = null): TelephoneBid
    {
        $lot = Lot::findOrFail($data['lot_id']);

        if ($lot->status !== Lot::STATUS_LIVE || ! $lot->is_active) {
            throw new \Exception('This lot is not accepting telephone bid requests.');
        }

        return DB::transaction(function () use ($data, $user) {
            return TelephoneBid::create([
                'lot_id' => $data['lot_id'],
                'user_id' => $user?->id,
                'guest_name' => $data['guest_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address_1' => $data['address_1'],
                'address_2' => $data['address_2'] ?? null,
                'city' => $data['city'],
                'postcode' => $data['postcode'],
                'country' => $data['country'],
                'max_bid_amount' => $data['max_bid_amount'] ?? null,
                'status' => TelephoneBid::STATUS_PENDING,
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }

    public function approve(TelephoneBid $telephoneBid, User $approver, ?string $notes = null): TelephoneBid
    {
        return $this->updateStatus($telephoneBid, TelephoneBid::STATUS_APPROVED, $approver, $notes);
    }

    public function reject(TelephoneBid $telephoneBid, User $approver, ?string $notes = null): TelephoneBid
    {
        return $this->updateStatus($telephoneBid, TelephoneBid::STATUS_REJECTED, $approver, $notes);
    }

    public function update(TelephoneBid $telephoneBid, array $data, User $approver): TelephoneBid
    {
        $telephoneBid->fill([
            'status' => $data['status'] ?? $telephoneBid->status,
            'notes' => $data['notes'] ?? $telephoneBid->notes,
            'approved_by' => $approver->id,
        ]);

        $telephoneBid->save();

        return $telephoneBid;
    }

    public function getAll(int $perPage = 20)
    {
        return TelephoneBid::with(['lot', 'user', 'approver'])
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    protected function updateStatus(TelephoneBid $telephoneBid, string $status, User $approver, ?string $notes = null): TelephoneBid
    {
        $telephoneBid->status = $status;
        $telephoneBid->approved_by = $approver->id;

        if ($notes !== null) {
            $telephoneBid->notes = $notes;
        }

        $telephoneBid->save();

        return $telephoneBid;
    }
}
