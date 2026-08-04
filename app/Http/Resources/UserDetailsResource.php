<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'phone' => $this->phone,
            'company_name' => $this->company_name,
            'company_role' => $this->company_role,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'business_type' => $this->business_type,
            'is_profile_complete' => $this->is_profile_complete,
        ];
    }
}
