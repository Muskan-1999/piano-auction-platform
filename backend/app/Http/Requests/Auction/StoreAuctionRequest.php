<?php

namespace App\Http\Requests\Auction;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuctionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:auctions,slug'],
            'description' => ['nullable', 'string'],
            'banner_image' => ['nullable', 'image', 'max:2048'],
            'auction_type' => ['required', 'string', 'in:online,live,hybrid'],
            'preview_start_time' => ['nullable', 'date', 'before_or_equal:start_time'],
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date', 'after:start_time'],
            'status' => ['nullable', 'string', 'in:draft,upcoming,live,ended'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['boolean'],
            'is_live' => ['boolean'],
        ];
    }
}
