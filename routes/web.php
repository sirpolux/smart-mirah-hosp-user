<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDetailController;
use App\Http\Resources\CartResource;
use App\Http\Resources\ItemResource;
use App\Models\Cart;
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

Route::get('/products/{item}', function (Item $item) {
    $item->load(['category', 'uploads', 'details']);

    return Inertia::render('ProductDetail', [
        'product' => new ItemResource($item),
    ]);
})->name('products.show');

Route::get('/dashboard', function () {
    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/details', [UserDetailController::class, 'show'])->name('profile.details');
    Route::patch('/profile/details', [UserDetailController::class, 'update'])->name('profile.details.update');

    // Cart routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');

    // Cart item routes
    Route::post('/cart/items', [CartItemController::class, 'store'])->name('cart.items.store');
    Route::patch('/cart/items/{cartItem}', [CartItemController::class, 'update'])->name('cart.items.update');
    Route::delete('/cart/items/{cartItem}', [CartItemController::class, 'destroy'])->name('cart.items.destroy');

    // Checkout & Orders
    Route::get('/checkout', function () {
        $user = request()->user();
        $cart = Cart::with(['items.item.uploads', 'items.item.category'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        return Inertia::render('Checkout', [
            'cart' => $cart ? new CartResource($cart) : null,
        ]);
    })->name('checkout');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
});

require __DIR__.'/auth.php';
