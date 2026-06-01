<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SellMyPianoResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'full_name'  => $this->full_name,
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'email'      => $this->email,
            'phone'      => $this->phone,

            'valuation_type' => $this->valuation_type,

            'piano_type'            => $this->piano_type,
            'piano_make'            => $this->piano_make,
            'piano_model'           => $this->piano_model,
            'piano_colour'          => $this->piano_colour,
            'serial_number'         => $this->serial_number,
            'dimensions'            => $this->dimensions,
            'age_of_piano'          => $this->age_of_piano,
            'ivory_keys'            => $this->ivory_keys,
            'tuned_recently'        => $this->tuned_recently,
            'reconditioned'         => $this->reconditioned,
            'ownership_history'     => $this->ownership_history,
            'condition_description' => $this->condition_description,
            'additional_notes'      => $this->additional_notes,

            'address_line_1'               => $this->address_line_1,
            'address_line_2'               => $this->address_line_2,
            'city'                         => $this->city,
            'state'                        => $this->state,
            'postcode'                     => $this->postcode,
            'country'                      => $this->country,
            'collection_address_different' => $this->collection_address_different,
            'preferred_contact_method'     => $this->preferred_contact_method,
            'preferred_contact_time'       => $this->preferred_contact_time,

            'images' => collect($this->images ?? [])->map(
                fn (string $path) => Storage::disk('public')->url($path)
            )->values(),

            'status'          => $this->status,
            'estimated_value' => $this->estimated_value,
            'admin_notes'     => $this->admin_notes,
            'contacted_at'    => $this->contacted_at?->toDateTimeString(),

            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
