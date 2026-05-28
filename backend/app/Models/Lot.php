<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Lot extends Model
{
    use HasFactory;

    public const STATUS_DRAFT = 'draft';
    public const STATUS_PUBLISHED = 'published';
    public const STATUS_LIVE = 'live';
    public const STATUS_SOLD = 'sold';
    public const STATUS_UNSOLD = 'unsold';
    public const STATUS_WITHDRAWN = 'withdrawn';

    public const CONDITION_EXCELLENT = 'excellent';
    public const CONDITION_GOOD = 'good';
    public const CONDITION_FAIR = 'fair';
    public const CONDITION_POOR = 'poor';
    public const CONDITION_UNKNOWN = 'unknown';

    protected $fillable = [
        'auction_id',
        'title',
        'slug',
        'lot_number',
        'description',
        'brand',
        'model',
        'serial_number',
        'year',
        'condition',
        'starting_bid',
        'reserve_price',
        'current_bid',
        'bid_increment',
        'featured_image',
        'gallery',
        'ends_at',
        'status',
        'is_active',
    ];

    protected $casts = [
        'starting_bid' => 'float',
        'reserve_price' => 'float',
        'current_bid' => 'float',
        'bid_increment' => 'float',
        'gallery' => 'array',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Lot $lot) {
            if (!$lot->slug && $lot->title) {
                $lot->slug = $lot->generateSlug($lot->title, $lot->auction_id);
            }

            if (!$lot->current_bid) {
                $lot->current_bid = $lot->starting_bid;
            }
        });
    }

    public function auction(): BelongsTo
    {
        return $this->belongsTo(Auction::class);
    }

    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePublished($query)
    {
        return $query->whereIn('status', [self::STATUS_PUBLISHED, self::STATUS_LIVE, self::STATUS_SOLD, self::STATUS_UNSOLD]);
    }

    public function scopeLive($query)
    {
        return $query->where('status', self::STATUS_LIVE);
    }

    public function generateSlug(string $title, int $auctionId): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (self::where('slug', $slug)
            ->where('auction_id', $auctionId)
            ->exists()) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }

    public function canAcceptBids(): bool
    {
        return $this->status === self::STATUS_LIVE && $this->is_active && !$this->isSold();
    }

    public function isSold(): bool
    {
        return $this->status === self::STATUS_SOLD;
    }
}
