<?php

namespace App\Http\Requests\TelephoneBid;

use Illuminate\Foundation\Http\FormRequest;

class StoreTelephoneBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lot_id' => ['required', 'exists:lots,id'],
            'guest_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'address_1' => ['required', 'string', 'max:255'],
            'address_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'postcode' => ['required', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:100'],
            'max_bid_amount' => ['nullable', 'numeric', 'gte:0'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
