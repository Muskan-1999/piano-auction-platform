<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'type', 'first_name', 'last_name', 'email', 'phone', 'address', 'postcode', 'country', 'lot_numbers', 'description', 'extra_data'
    ];

    protected $casts = [
        'extra_data' => 'array',
    ];
}
