<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
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
            'item_name' => $this->item_name,
            'item_description' => $this->item_description,
            'manufacturer' => $this->manufacturer,
            'price' => (float) $this->price,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'category_id' => $this->category_id,
            'category' => $this->whenLoaded('category', fn () => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ]),
            'image' => $this->whenLoaded('uploads', function () {
                $upload = $this->uploads->first();
                return $upload ? $upload->file_path : null;
            }),
            'details' => $this->whenLoaded('details', fn () =>
                $this->details->map(fn ($d) => [
                    'id' => $d->id,
                    'data' => $d->data,
                ])
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
