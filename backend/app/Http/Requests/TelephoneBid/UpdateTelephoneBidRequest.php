<?php

namespace App\Http\Requests\TelephoneBid;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTelephoneBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    public function rules(): array
    {
        return [
            'status' => ['nullable', 'string', 'in:pending,approved,rejected,contacted,completed'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
