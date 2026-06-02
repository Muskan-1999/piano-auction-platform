<?php

namespace App\Http\Requests\DeliveryQuote;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryQuoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name'      => ['required', 'string', 'max:255'],
            'last_name'       => ['required', 'string', 'max:255'],
            'email'           => ['required', 'email', 'max:255'],
            'phone'           => ['required', 'string', 'max:30'],

            'piano_make'      => ['nullable', 'string', 'max:255'],
            'piano_model'     => ['nullable', 'string', 'max:255'],
            'piano_type'      => ['required', 'string', 'in:Grand Piano,Upright Piano'],
            'estimated_value' => ['nullable', 'string', 'max:100'],

            'address_line_1'  => ['required', 'string', 'max:255'],
            'address_line_2'  => ['nullable', 'string', 'max:255'],
            'city'            => ['required', 'string', 'max:100'],
            'postcode'        => ['required', 'string', 'max:20'],

            'has_stairs'      => ['required', 'boolean'],
            'num_stairs'      => ['nullable', 'integer', 'min:1', 'max:200'],
            'is_lift'         => ['nullable', 'boolean'],

            'delivery_notes'  => ['nullable', 'string', 'max:2000'],
        ];
    }
}
