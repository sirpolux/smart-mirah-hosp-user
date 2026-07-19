<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'delivery_channel' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'delivery_address' => 'nullable|string|max:500',
            'delivery_state' => 'nullable|string|max:255',
        ];
    }
}
