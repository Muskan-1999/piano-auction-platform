<?php

namespace App\Http\Requests\AbsenteeBid;

use Illuminate\Foundation\Http\FormRequest;

class StoreAbsenteeBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lot_number' => ['required', 'string', 'exists:lots,lot_number'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string', 'max:255'],
            'address_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'postcode' => ['required', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:1000'],
            'max_bid_per_lot' => ['required', 'numeric', 'gt:0'],
            'currency' => ['required', 'string', 'in:GBP,EUR,USD'],
            'one_piano_only' => ['required', 'string', 'in:yes,no'],
            'additional_notes' => ['nullable', 'string'],
        ];
    }
}
