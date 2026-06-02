<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryQuote extends Model
{
    use HasFactory;

    public const STATUS_NEW        = 'new';
    public const STATUS_CONTACTED  = 'contacted';
    public const STATUS_QUOTED     = 'quoted';
    public const STATUS_COMPLETED  = 'completed';

    public const STATUSES = [
        self::STATUS_NEW       => 'New',
        self::STATUS_CONTACTED => 'Contacted',
        self::STATUS_QUOTED    => 'Quoted',
        self::STATUS_COMPLETED => 'Completed',
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'piano_make',
        'piano_model',
        'piano_type',
        'estimated_value',
        'address_line_1',
        'address_line_2',
        'city',
        'postcode',
        'has_stairs',
        'num_stairs',
        'is_lift',
        'delivery_notes',
        'status',
    ];

    protected $casts = [
        'has_stairs' => 'boolean',
        'is_lift'    => 'boolean',
    ];

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
