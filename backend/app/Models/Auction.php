<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AuctionRegistration;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Auction extends Model
{
    use HasFactory;

    public const TYPE_ONLINE = 'online';
    public const TYPE_LIVE = 'live';
    public const TYPE_HYBRID = 'hybrid';

    public const STATUS_DRAFT = 'draft';
    public const STATUS_UPCOMING = 'upcoming';
    public const STATUS_LIVE = 'live';
    public const STATUS_ENDED = 'ended';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'banner_image',
        'catalogue_pdf',
        'auction_type',
        'start_time',
        'end_time',
        'preview_start_time',
        'status',
        'location',
        'is_featured',
        'is_live',
        'created_by',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'preview_start_time' => 'datetime',
        'is_featured' => 'boolean',
        'is_live' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Auction $auction) {
            if (! $auction->slug && $auction->title) {
                $auction->slug = $auction->generateSlug($auction->title);
            }

            if ($auction->status === self::STATUS_LIVE) {
                $auction->is_live = true;
            }

            if ($auction->status === self::STATUS_ENDED) {
                $auction->is_live = false;
            }
        });
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function lots(): HasMany
    {
        return $this->hasMany(Lot::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(AuctionRegistration::class);
    }

    public function getCataloguePdfUrlAttribute(): ?string
    {
        return $this->catalogue_pdf ? url('storage/' . $this->catalogue_pdf) : null;
    }

    public function scopeLive($query)
    {
        return $query->where('status', self::STATUS_LIVE);
    }

    public function generateSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (self::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }
}
