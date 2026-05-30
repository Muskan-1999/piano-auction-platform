<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'message' => ['required', 'string'],
        ]);

        ContactUs::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Contact form submitted successfully',
        ], 200);
    }
}
