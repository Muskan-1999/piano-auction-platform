<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PianoBrand;
use Illuminate\Http\JsonResponse;

class PianoBrandController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(PianoBrand::all(['id', 'name', 'icon_url']));
    }
}
