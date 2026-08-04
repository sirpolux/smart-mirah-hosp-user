<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Seed the payment accounts shown to users for transfer.
     *
     * Update these with the real business account details before seeding.
     */
    public function run(): void
    {
        Account::updateOrCreate(
            ['account_number' => '0123456789'],
            [
                'account_name' => 'Smart Mirah Hospitality',
                'bank_name' => 'Access Bank',
                'is_primary_account' => true,
            ]
        );

        Account::updateOrCreate(
            ['account_number' => '9876543210'],
            [
                'account_name' => 'Smart Mirah Hospitality',
                'bank_name' => 'GTBank',
                'is_primary_account' => false,
            ]
        );
    }
}
