<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewingAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'auction_type',
        'appointment_date',
        'appointment_time',
        'first_name',
        'last_name',
        'email',
        'phone',
        'num_guests',
        'notes',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];
}
