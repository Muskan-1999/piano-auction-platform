<?php

namespace App\Services;

use App\Models\AbsenteeBid;
use App\Models\Lot;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AbsenteeBidService
{
    public function create(array $data, ?User $user = null): AbsenteeBid
    {
        $lot = Lot::findOrFail($data['lot_id']);

        if ($lot->status !== Lot::STATUS_LIVE || ! $lot->is_active) {
            throw new \Exception('This lot is not accepting absentee bids.');
        }

        return DB::transaction(function () use ($data, $user) {
            return AbsenteeBid::create([
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
                'max_bid_amount' => $data['max_bid_amount'],
                'status' => AbsenteeBid::STATUS_PENDING,
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }

    public function approve(AbsenteeBid $absenteeBid, User $approver, ?string $notes = null): AbsenteeBid
    {
        return $this->updateStatus($absenteeBid, AbsenteeBid::STATUS_APPROVED, $approver, $notes);
    }

    public function reject(AbsenteeBid $absenteeBid, User $approver, ?string $notes = null): AbsenteeBid
    {
        return $this->updateStatus($absenteeBid, AbsenteeBid::STATUS_REJECTED, $approver, $notes);
    }

    public function update(AbsenteeBid $absenteeBid, array $data, User $approver): AbsenteeBid
    {
        $absenteeBid->fill([
            'status' => $data['status'] ?? $absenteeBid->status,
            'notes' => $data['notes'] ?? $absenteeBid->notes,
            'approved_by' => $approver->id,
        ]);

        $absenteeBid->save();

        return $absenteeBid;
    }

    public function getAll(int $perPage = 20)
    {
        return AbsenteeBid::with(['lot', 'user', 'approver'])
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    protected function updateStatus(AbsenteeBid $absenteeBid, string $status, User $approver, ?string $notes = null): AbsenteeBid
    {
        $absenteeBid->status = $status;
        $absenteeBid->approved_by = $approver->id;

        if ($notes !== null) {
            $absenteeBid->notes = $notes;
        }

        $absenteeBid->save();

        return $absenteeBid;
    }
}
