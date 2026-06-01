<?php

namespace App\Http\Requests\AbsenteeBid;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAbsenteeBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    public function rules(): array
    {
        return [
            'status' => ['nullable', 'string', 'in:pending,approved,rejected,active,completed'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
