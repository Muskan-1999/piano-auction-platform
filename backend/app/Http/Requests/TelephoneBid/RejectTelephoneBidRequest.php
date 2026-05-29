<?php

namespace App\Http\Requests\TelephoneBid;

use Illuminate\Foundation\Http\FormRequest;

class RejectTelephoneBidRequest extends FormRequest
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
