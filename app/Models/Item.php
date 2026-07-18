<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    protected $fillable = [
        'item_name',
        'category_id',
        'item_description',
        'manufacturer',
        'price',
        'status',
        'quantity',
        'deleted',
        'created_by',
        'updated_by',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ItemCategory::class, 'category_id');
    }

    public function uploads(): HasMany
    {
        return $this->hasMany(Upload::class, 'item_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(ItemDetails::class, 'item_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class, 'item_id');
    }
}
