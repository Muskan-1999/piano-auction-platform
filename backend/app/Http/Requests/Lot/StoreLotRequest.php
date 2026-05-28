<?php

namespace App\Http\Requests\Lot;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'lot_number' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'brand' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'serial_number' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer', 'min:1800', 'max:2100'],
            'condition' => ['nullable', 'string', 'in:excellent,good,fair,poor,unknown'],
            'starting_bid' => ['required', 'numeric', 'min:0'],
            'reserve_price' => ['nullable', 'numeric', 'min:0'],
            'bid_increment' => ['nullable', 'numeric', 'min:0'],
            'featured_image' => ['nullable', 'image', 'max:2048'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['image', 'max:2048'],
            'ends_at' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'in:draft,published,live,sold,unsold,withdrawn'],
            'is_active' => ['boolean'],
        ];
    }
}
