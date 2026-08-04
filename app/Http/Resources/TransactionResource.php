<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'amount' => (float) $this->amount,
            'description' => $this->description,
            'status' => $this->status,
            'purpose' => $this->purpose,
            'confirmed_at' => $this->confirmed_at,
            'uploads' => UploadResource::collection($this->whenLoaded('uploads')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
