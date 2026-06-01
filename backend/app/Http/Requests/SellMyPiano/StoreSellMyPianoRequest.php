<?php

namespace App\Http\Requests\SellMyPiano;

use Illuminate\Foundation\Http\FormRequest;

class StoreSellMyPianoRequest extends FormRequest
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
            'valuation_type'       => ['required', 'string', 'in:Auction Valuation,Insurance Valuation,Sale Valuation'],
            'piano_type'           => ['required', 'string', 'in:Upright Piano,Grand Piano,Baby Grand Piano,Digital Piano'],
            'piano_make'           => ['required', 'string', 'max:255'],
            'piano_model'          => ['nullable', 'string', 'max:255'],
            'piano_colour'         => ['required', 'string', 'max:100'],
            'serial_number'        => ['nullable', 'string', 'max:100'],
            'dimensions'           => ['nullable', 'string', 'max:255'],
            'age_of_piano'         => ['nullable', 'string', 'max:100'],
            'ivory_keys'           => ['required', 'string', 'in:Yes,No,Unknown'],
            'tuned_recently'       => ['required', 'string', 'in:Yes,No'],
            'reconditioned'        => ['required', 'string', 'in:Yes,No'],
            'ownership_history'    => ['required', 'string'],
            'condition_description'=> ['required', 'string'],
            'additional_notes'     => ['nullable', 'string'],

            // Piano Images
            'images'               => ['nullable', 'array', 'max:5'],
            'images.*'             => ['file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],

            // Step 3 — Address Details
            'address_line_1'               => ['required', 'string', 'max:255'],
            'address_line_2'               => ['nullable', 'string', 'max:255'],
            'city'                         => ['required', 'string', 'max:100'],
            'state'                        => ['nullable', 'string', 'max:100'],
            'postcode'                     => ['required', 'string', 'max:20'],
            'country'                      => ['required', 'string', 'max:100'],
            'collection_address_different' => ['nullable', 'boolean'],
            'preferred_contact_method'     => ['required', 'string', 'in:Email,Phone'],
            'preferred_contact_time'       => ['nullable', 'string', 'in:Morning,Afternoon,Evening'],
        ];
    }

    public function messages(): array
    {
        return [
            'valuation_type.in'       => 'Please select a valid valuation type.',
            'piano_type.in'           => 'Please select a valid piano type.',
            'ivory_keys.in'           => 'Please select a valid ivory keys option.',
            'tuned_recently.in'       => 'Please select Yes or No for tuned recently.',
            'reconditioned.in'        => 'Please select Yes or No for reconditioned.',
            'preferred_contact_method.in' => 'Preferred contact method must be Email or Phone.',
            'images.max'              => 'You may upload a maximum of 5 images.',
            'images.*.max'            => 'Each image must be no larger than 5MB.',
            'images.*.mimes'          => 'Images must be jpg, jpeg, png, or webp.',
        ];
    }
}
