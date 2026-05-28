<?php

namespace App\Http\Requests\Auction;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAuctionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
                Rule::unique('auctions', 'slug')->ignore($this->route('auction')),
            ],
            'description' => ['sometimes', 'nullable', 'string'],
            'banner_image' => ['sometimes', 'nullable', 'image', 'max:2048'],
            'auction_type' => ['sometimes', 'required', 'string', 'in:online,live,hybrid'],
            'preview_start_time' => ['sometimes', 'nullable', 'date', 'before_or_equal:start_time'],
            'start_time' => ['sometimes', 'required', 'date'],
            'end_time' => ['sometimes', 'required', 'date', 'after:start_time'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,upcoming,live,ended'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_live' => ['sometimes', 'boolean'],
        ];
    }
}
