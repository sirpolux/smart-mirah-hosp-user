<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    /** @use HasFactory<\Database\Factories\AccountFactory> */
    use HasFactory;

    protected $fillable = [
        'account_name',
        'account_number',
        'bank_name',
        'is_primary_account',
    ];

    protected $casts = [
        'is_primary_account' => 'boolean',
    ];

    /**
     * Scope to the primary payment account (fallback to first available).
     */
    public function scopePrimaryAccount(Builder $query): Builder
    {
        return $query->orderByDesc('is_primary_account')->orderBy('id');
    }
}
