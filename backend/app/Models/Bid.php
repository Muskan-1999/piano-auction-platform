<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bid extends Model
{
    use HasFactory;

    public const TYPE_ONLINE = 'online';
    public const TYPE_TELEPHONE = 'telephone';
    public const TYPE_ABSENTEE = 'absentee';
    public const TYPE_ADMIN = 'admin';

    public const STATUS_ACTIVE = 'active';
    public const STATUS_WINNING = 'winning';
    public const STATUS_OUTBID = 'outbid';
    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'lot_id',
        'user_id',
        'amount',
        'bid_type',
        'status',
        'ip_address',
        'user_agent',
        'placed_at',
        'is_winning',
        'is_live_bid',
    ];

    protected $casts = [
        'amount' => 'float',
        'placed_at' => 'datetime',
        'is_winning' => 'boolean',
        'is_live_bid' => 'boolean',
    ];

    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
