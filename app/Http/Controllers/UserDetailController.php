<?php

namespace App\Http\Controllers;

use App\Models\UserDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserDetailController extends Controller
{
    public function show(Request $request): Response
    {
        $detail = $request->user()->detail;

        return Inertia::render('Profile/Details', [
            'detail' => $detail,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'phone' => ['nullable', 'string', 'max:20'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'company_role' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'business_type' => ['nullable', 'string', 'max:50'],
        ]);

        $user = $request->user();

        $detail = $user->detail()->firstOrNew(['user_id' => $user->id]);
        $detail->fill($validated);
        $detail->is_profile_complete = true;
        $detail->save();

        return Redirect::route('profile.details')->with('status', 'profile-updated');
    }
}
