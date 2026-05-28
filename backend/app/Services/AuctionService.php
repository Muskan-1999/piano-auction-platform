<?php

namespace App\Services;

use App\Models\Auction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuctionService
{
    public function create(array $data, User $user): Auction
    {
        return DB::transaction(function () use ($data, $user) {
            $auction = Auction::create(array_merge($data, [
                'slug' => $this->generateSlug($data['title']),
                'created_by' => $user->id,
                'is_live' => $data['status'] === Auction::STATUS_LIVE || ($data['is_live'] ?? false),
                'status' => $data['status'] ?? Auction::STATUS_DRAFT,
            ]));

            if ($auction->is_live) {
                $this->ensureOnlyOneLive($auction);
            }

            return $auction;
        });
    }

    public function update(Auction $auction, array $data): Auction
    {
        return DB::transaction(function () use ($auction, $data) {
            if (isset($data['title']) && $data['title'] !== $auction->title) {
                $data['slug'] = $this->generateSlug($data['title'], $auction->id);
            }

            if (array_key_exists('status', $data)) {
                $auction->status = $data['status'];
            }

            if (array_key_exists('is_live', $data)) {
                $auction->is_live = $data['is_live'];
            }

            $auction->fill($data);
            $auction->save();

            if ($auction->is_live) {
                $this->ensureOnlyOneLive($auction);
            }

            if ($auction->status === Auction::STATUS_ENDED) {
                $auction->update(['is_live' => false]);
            }

            return $auction;
        });
    }

    public function changeStatus(Auction $auction, string $status): Auction
    {
        return DB::transaction(function () use ($auction, $status) {
            $auction->status = $status;
            $auction->is_live = $status === Auction::STATUS_LIVE;
            $auction->save();

            if ($status === Auction::STATUS_LIVE) {
                $this->ensureOnlyOneLive($auction);
            }

            if ($status === Auction::STATUS_ENDED) {
                $auction->update(['is_live' => false]);
            }

            return $auction;
        });
    }

    public function delete(Auction $auction): void
    {
        $auction->delete();
    }

    protected function ensureOnlyOneLive(Auction $current): void
    {
        Auction::where('id', '!=', $current->id)
            ->where('is_live', true)
            ->update(['is_live' => false, 'status' => Auction::STATUS_ENDED]);
    }

    protected function generateSlug(string $title, ?int $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $counter = 1;

        while (Auction::where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $original . '-' . $counter++;
        }

        return $slug;
    }
}
