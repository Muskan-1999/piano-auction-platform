<?php

namespace App\Http\Requests\Lot;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255'],
            'lot_number' => ['sometimes', 'required', 'integer', 'min:1'],
            'description' => ['sometimes', 'nullable', 'string'],
            'brand' => ['sometimes', 'nullable', 'string', 'max:255'],
            'model' => ['sometimes', 'nullable', 'string', 'max:255'],
            'serial_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'integer', 'min:1800', 'max:2100'],
            'condition' => ['sometimes', 'nullable', 'string', 'in:excellent,good,fair,poor,unknown'],
            'starting_bid' => ['sometimes', 'required', 'numeric', 'min:0'],
            'reserve_price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'bid_increment' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'featured_image' => ['sometimes', 'nullable', 'image', 'max:2048'],
            'gallery' => ['sometimes', 'nullable', 'array'],
            'gallery.*' => ['image', 'max:2048'],
            'ends_at' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,published,live,sold,unsold,withdrawn'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
