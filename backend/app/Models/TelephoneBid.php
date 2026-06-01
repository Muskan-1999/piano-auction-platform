<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TelephoneBid extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_CONTACTED = 'contacted';
    public const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'lot_id',
        'user_id',
        'guest_name',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'address_1',
        'address_2',
        'city',
        'postcode',
        'post_code',
        'country',
        'max_bid_amount',
        'preferred_call_time',
        'one_piano_only',
        'additional_notes',
        'lot_description',
        'lot_1_number',
        'lot_1_description',
        'lot_2_number',
        'lot_2_description',
        'lot_3_number',
        'lot_3_description',
        'lot_4_number',
        'lot_4_description',
        'lot_5_number',
        'lot_5_description',
        'status',
        'notes',
        'approved_by',
    ];

    protected $casts = [
        'max_bid_amount' => 'float',
        'one_piano_only' => 'boolean',
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
