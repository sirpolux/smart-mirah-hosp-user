<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'total_quantity' => $this->total_quantity,
            'total_price' => (float) $this->total_price,
            'status' => $this->status,
            'delivery_channel' => $this->delivery_channel,
            'contact_number' => $this->contact_number,
            'delivery_address' => $this->delivery_address,
            'delivery_state' => $this->delivery_state,
            'receipt_ref' => $this->receipt_ref,
            'items' => $this->whenLoaded('items', fn () =>
                $this->items->map(fn ($item) => [
                    'id' => $item->id,
                    'item_id' => $item->item_id,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total_price' => (float) $item->total_price,
                    'item' => $item->item ? new ItemResource($item->item) : null,
                ])
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
