<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with the latest available items.
     */
    public function index()
    {
        $items = Item::with(['category', 'uploads', 'details'])
            ->where('status', 'available')
            ->where('deleted', false)
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();


            // dd($items);

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'items' => ItemResource::collection($items),
        ]);
    }

    /**
     * Display the about page.
     */
    public function about()
    {
        return Inertia::render('Home');
    }

    /**
     * Display the services page.
     */
    public function services()
    {
        return Inertia::render('Home');
    }

    /**
     * Display the contact page.
     */
    public function contact()
    {
        return Inertia::render('Home');
    }

    /**
     * Redirect the dashboard to the home page.
     */
    public function dashboard()
    {
        return redirect()->route('home');
    }
}
