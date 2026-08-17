<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Send a contact message to the info email address.
     */
    public function store(Request $request): RedirectResponse
    {
        // Honeypot field: silently discard bots.
        if ($request->filled('website')) {
            return back();
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            Mail::to(config('services.info_email'))
                ->send(new ContactMail(
                    name: $validated['name'],
                    company: $validated['company'] ?? null,
                    email: $validated['email'],
                    phone: $validated['phone'] ?? null,
                    contactMessage: $validated['message'],
                ));
        } catch (\Throwable $e) {
            report($e);

            return back()->with('error', 'Sorry, we could not send your message right now. Please try again shortly.');
        }

        return back()->with('success', 'Your message has been sent. We will get back to you shortly.');
    }
}
