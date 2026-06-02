<?php

namespace App\Http\Requests\ValueMyPiano;

use Illuminate\Foundation\Http\FormRequest;

class StoreValueMyPianoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // public — guest submissions allowed
    }

    public function rules(): array
    {
        return [
            // Step 1 — Personal Details
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
            'phone'      => ['required', 'string', 'max:30'],

            // Step 2 — Piano Details
            'valuation_type'    => ['required', 'string', 'in:Auction Valuation,Insurance Valuation,Probate Valuation,Private Sale Valuation'],
            'piano_type'        => ['required', 'string', 'in:Upright Piano,Grand Piano,Baby Grand Piano,Digital Piano,Player Piano,Other'],
            'piano_make'        => ['required', 'string', 'max:255'],
            'piano_model'       => ['nullable', 'string', 'max:255'],
            'piano_colour'      => ['nullable', 'string', 'max:100'],
            'serial_number'     => ['nullable', 'string', 'max:100'],
            'dimensions'        => ['nullable', 'string', 'max:255'],
            'ivory_keys'        => ['nullable', 'string', 'in:Yes,No,Unknown'],
            'tuned'             => ['nullable', 'string', 'in:Yes,No'],
            'reconditioned'     => ['nullable', 'string', 'in:Yes,No'],
            'ownership_history' => ['nullable', 'string'],

            // Piano Images
            'images'   => ['nullable', 'array', 'max:5'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],

            // Step 3 — Address Details
            'address_line_1' => ['required', 'string', 'max:255'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'postcode'       => ['required', 'string', 'max:20'],
            'country'        => ['required', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'valuation_type.in' => 'Please select a valid valuation type.',
            'piano_type.in'     => 'Please select a valid piano type.',
            'ivory_keys.in'     => 'Please select a valid ivory keys option.',
            'tuned.in'          => 'Please select Yes or No for tuned.',
            'reconditioned.in'  => 'Please select Yes or No for reconditioned.',
            'images.max'        => 'You may upload a maximum of 5 images.',
            'images.*.max'      => 'Each image must be no larger than 5MB.',
            'images.*.mimes'    => 'Images must be jpg, jpeg, png, or webp.',
        ];
    }
}
