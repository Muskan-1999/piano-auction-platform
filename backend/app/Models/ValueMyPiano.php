<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ValueMyPiano extends Model
{
    use HasFactory;

    public const STATUS_NEW       = 'new';
    public const STATUS_CONTACTED = 'contacted';
    public const STATUS_IN_REVIEW = 'in_review';
    public const STATUS_COMPLETED = 'completed';

    public const STATUSES = [
        self::STATUS_NEW       => 'New',
        self::STATUS_CONTACTED => 'Contacted',
        self::STATUS_IN_REVIEW => 'In Review',
        self::STATUS_COMPLETED => 'Completed',
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
        'ivory_keys',
        'tuned',
        'reconditioned',
        'ownership_history',
        'address_line_1',
        'address_line_2',
        'postcode',
        'country',
        'status',
        'notes',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ValueMyPianoImage::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
