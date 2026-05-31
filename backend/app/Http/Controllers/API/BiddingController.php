<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BiddingRequest;
use App\Models\OnlineBidder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class BiddingController extends Controller
{
    public function telephone(Request $request)
    {
        $v = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'postcode' => 'required|string',
            'country' => 'required|string',
            'lot_numbers' => 'required|array|min:1',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => 'error', 'errors' => $v->errors()], 422);
        }

        BiddingRequest::create([
            'type' => 'telephone',
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'postcode' => $request->postcode,
            'country' => $request->country,
            'lot_numbers' => json_encode($request->lot_numbers),
            'description' => null,
            'extra_data' => [
                'preferred_call_time' => $request->preferred_call_time,
                'one_piano_only' => $request->one_piano_only === 'yes',
                'notes' => $request->notes,
            ],
        ]);

        return response()->json(['status' => 'success', 'message' => 'Telephone bid submitted successfully']);
    }

    public function absentee(Request $request)
    {
        $v = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'postcode' => 'required|string',
            'country' => 'required|string',
            'lot_numbers' => 'required|array|min:1',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => 'error', 'errors' => $v->errors()], 422);
        }

        BiddingRequest::create([
            'type' => 'absentee',
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'postcode' => $request->postcode,
            'country' => $request->country,
            'lot_numbers' => json_encode($request->lot_numbers),
            'description' => null,
            'extra_data' => [
                'currency' => $request->currency ?? 'GBP',
                'one_piano_only' => $request->one_piano_only === 'yes',
                'notes' => $request->notes,
            ],
        ]);

        return response()->json(['status' => 'success', 'message' => 'Absentee bid submitted successfully']);
    }

    public function online(Request $request)
    {
        $v = Validator::make($request->all(), [
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email',
            'username' => 'required|string|unique:online_bidders,username',
            'agree_terms' => 'accepted',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => 'error', 'errors' => $v->errors()], 422);
        }

        // create bidder record (optional)
        $bidder = OnlineBidder::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => $request->password ? Hash::make($request->password) : null,
            'bidder_id' => 'BID' . now()->timestamp,
            'verified' => (bool) $request->identity_verified,
        ]);

        BiddingRequest::create([
            'type' => 'online',
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'postcode' => $request->postcode,
            'country' => $request->country,
            'lot_numbers' => json_encode($request->lot_interest_list ?? []),
            'description' => null,
            'extra_data' => [
                'bidder_id' => $bidder->bidder_id,
                'payment_method_preference' => $request->payment_method_preference,
                'max_auto_bid_limit' => $request->max_auto_bid_limit,
            ],
        ]);

        return response()->json(['status' => 'success', 'message' => 'Online registration submitted successfully']);
    }
}
