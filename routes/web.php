<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $items = Item::with(['category', 'uploads', 'details'])
        ->where('status', 'available')
        ->where('deleted', false)
        ->orderBy('created_at', 'desc')
        ->take(8)
        ->get();

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'items' => ItemResource::collection($items),
    ]);
})->name('home');

Route::get('/about', fn () => Inertia::render('Home'))->name('about');
Route::get('/services', fn () => Inertia::render('Home'))->name('services');
Route::get('/contact', fn () => Inertia::render('Home'))->name('contact');

Route::get('/products', function () {
    $items = Item::with(['category', 'uploads', 'details'])
        ->where('status', 'available')
        ->where('deleted', false)
        ->orderBy('created_at', 'desc')
        ->paginate(12);

    return Inertia::render('Products', [
        'items' => ItemResource::collection($items),
    ]);
})->name('products');

Route::get('/dashboard', function () {
    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/details', [\App\Http\Controllers\UserDetailController::class, 'show'])->name('profile.details');
    Route::patch('/profile/details', [\App\Http\Controllers\UserDetailController::class, 'update'])->name('profile.details.update');
});

require __DIR__.'/auth.php';
