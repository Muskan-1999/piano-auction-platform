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
            'first_name'        => ['required', 'string', 'max:255'],
            'last_name'         => ['required', 'string', 'max:255'],
            'email'             => ['required', 'email', 'max:255'],
            'phone'             => ['required', 'string', 'max:50'],
            'address'           => ['required', 'string', 'max:255'],
            'post_code'         => ['required', 'string', 'max:50'],
            'lot_1_number'      => ['required', 'string', 'max:100', 'exists:lots,lot_number'],
            'lot_1_description' => ['required', 'string', 'max:1000'],
            'lot_2_number'      => ['nullable', 'string', 'max:100', 'exists:lots,lot_number'],
            'lot_2_description' => ['nullable', 'string', 'max:1000'],
            'lot_3_number'      => ['nullable', 'string', 'max:100', 'exists:lots,lot_number'],
            'lot_3_description' => ['nullable', 'string', 'max:1000'],
            'lot_4_number'      => ['nullable', 'string', 'max:100', 'exists:lots,lot_number'],
            'lot_4_description' => ['nullable', 'string', 'max:1000'],
            'lot_5_number'      => ['nullable', 'string', 'max:100', 'exists:lots,lot_number'],
            'lot_5_description' => ['nullable', 'string', 'max:1000'],
            'one_piano_only'    => ['required', 'boolean'],
            'max_bid_per_lot'   => ['nullable', 'numeric', 'min:0'],
            'currency'          => ['nullable', 'string', 'in:GBP,EUR,USD'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $numbers = array_filter([
                $this->input('lot_1_number'),
                $this->input('lot_2_number'),
                $this->input('lot_3_number'),
                $this->input('lot_4_number'),
                $this->input('lot_5_number'),
            ]);

            if (count($numbers) !== count(array_unique($numbers))) {
                $validator->errors()->add('lot_numbers', 'Each lot number must be unique.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'lot_1_number.exists' => 'Lot number does not exist in our system.',
            'lot_2_number.exists' => 'Lot 2 number does not exist in our system.',
            'lot_3_number.exists' => 'Lot 3 number does not exist in our system.',
            'lot_4_number.exists' => 'Lot 4 number does not exist in our system.',
            'lot_5_number.exists' => 'Lot 5 number does not exist in our system.',
        ];
    }
}
