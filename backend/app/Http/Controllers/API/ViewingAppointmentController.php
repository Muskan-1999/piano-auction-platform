<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ViewingAppointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ViewingAppointmentController extends Controller
{
    private const UK_DATES = [
        '2026-06-19',
        '2026-06-20',
        '2026-06-21',
        '2026-06-22',
    ];

    private const EU_DATES = [];

    public function availableDates(Request $request): JsonResponse
    {
        $type  = strtolower($request->query('type', 'uk'));
        $dates = $type === 'eu' ? self::EU_DATES : self::UK_DATES;

        return response()->json([
            'status' => 'success',
            'dates'  => $dates,
        ]);
    }

    public function availableSlots(Request $request): JsonResponse
    {
        $type  = strtolower($request->query('type', 'uk'));
        $date  = $request->query('date');
        $valid = $type === 'eu' ? self::EU_DATES : self::UK_DATES;

        if (! $date || ! in_array($date, $valid, true)) {
            return response()->json(['status' => 'success', 'slots' => []]);
        }

        $all = [];
        for ($h = 9; $h <= 16; $h++) {
            $all[] = sprintf('%02d:00', $h);
        }

        $booked = ViewingAppointment::where('appointment_date', $date)
            ->where('auction_type', $type)
            ->pluck('appointment_time')
            ->toArray();

        return response()->json([
            'status' => 'success',
            'slots'  => array_values(array_filter($all, fn ($s) => ! in_array($s, $booked, true))),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'auction_type'     => 'required|in:uk,eu',
            'appointment_date' => 'required|date_format:Y-m-d',
            'appointment_time' => 'required|string',
            'first_name'       => 'required|string|max:100',
            'last_name'        => 'required|string|max:100',
            'email'            => 'required|email|max:255',
            'phone'            => 'required|string|max:50',
            'num_guests'       => 'nullable|integer|min:2|max:20',
            'notes'            => 'nullable|string|max:2000',
        ]);

        $appointment = ViewingAppointment::create($data);

        return response()->json([
            'status'  => 'success',
            'message' => 'Your viewing appointment has been booked. A confirmation has been sent to your email.',
            'data'    => $appointment,
        ], 201);
    }
}
