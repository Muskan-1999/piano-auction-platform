<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AbsenteeBid extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'lot_id',
        'user_id',
        'guest_name',
        'email',
        'phone',
        'address_1',
        'address_2',
        'city',
        'postcode',
        'country',
        'max_bid_amount',
        'status',
        'notes',
        'approved_by',
    ];

    protected $casts = [
        'max_bid_amount' => 'float',
    ];

    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function getBidderNameAttribute(): ?string
    {
        return $this->guest_name ?? $this->user?->name;
    }
}
