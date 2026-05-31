<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuctionRegistration extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'user_id',
        'auction_id',
        'first_name',
        'last_name',
        'phone',
        'address',
        'country',
        'government_id_path',
        'proof_of_address_path',
        'status',
        'approved_by',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function auction(): BelongsTo
    {
        return $this->belongsTo(Auction::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function getGovernmentIdUrlAttribute(): ?string
    {
        return $this->government_id_path ? url('storage/' . $this->government_id_path) : null;
    }

    public function getProofOfAddressUrlAttribute(): ?string
    {
        return $this->proof_of_address_path ? url('storage/' . $this->proof_of_address_path) : null;
    }
}
