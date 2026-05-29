<?php

namespace App\Http\Requests\AbsenteeBid;

use Illuminate\Foundation\Http\FormRequest;

class ApproveAbsenteeBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    public function rules(): array
    {
        return [
            'notes' => ['nullable', 'string'],
        ];
    }
}
