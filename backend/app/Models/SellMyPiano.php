<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellMyPiano extends Model
{
    use HasFactory;

    public const STATUS_PENDING            = 'pending';
    public const STATUS_UNDER_REVIEW       = 'under_review';
    public const STATUS_CONTACTED          = 'contacted';
    public const STATUS_VALUATION_SENT     = 'valuation_sent';
    public const STATUS_ACCEPTED           = 'accepted';
    public const STATUS_SCHEDULED          = 'scheduled_for_auction';
    public const STATUS_SOLD               = 'sold';
    public const STATUS_REJECTED           = 'rejected';

    public const STATUSES = [
        self::STATUS_PENDING        => 'Pending',
        self::STATUS_UNDER_REVIEW   => 'Under Review',
        self::STATUS_CONTACTED      => 'Contacted',
        self::STATUS_VALUATION_SENT => 'Valuation Sent',
        self::STATUS_ACCEPTED       => 'Accepted',
        self::STATUS_SCHEDULED      => 'Scheduled For Auction',
        self::STATUS_SOLD           => 'Sold',
        self::STATUS_REJECTED       => 'Rejected',
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'valuation_type',
        'piano_type',
        'piano_make',
        'piano_model',
        'piano_colour',
        'serial_number',
        'dimensions',
        'age_of_piano',
        'ivory_keys',
        'tuned_recently',
        'reconditioned',
        'ownership_history',
        'condition_description',
        'additional_notes',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'postcode',
        'country',
        'collection_address_different',
        'preferred_contact_method',
        'preferred_contact_time',
        'images',
        'status',
        'estimated_value',
        'admin_notes',
        'contacted_at',
        'assigned_to',
    ];

    protected $casts = [
        'images'                      => 'array',
        'collection_address_different' => 'boolean',
        'estimated_value'             => 'float',
        'contacted_at'                => 'datetime',
    ];

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
