<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Get the authenticated user's active cart.
     */
    public function index()
    {
        $user = Auth::user();

        $cart = Cart::with(['items.item.uploads', 'items.item.category'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if (!$cart) {
            return response()->json([
                'data' => null,
                'message' => 'No active cart found.',
            ]);
        }

        return new CartResource($cart);
    }

    /**
     * Get or create an active cart for the authenticated user.
     */
    public function store(StoreCartRequest $request)
    {
        $user = Auth::user();

        $cart = Cart::with(['items.item.uploads', 'items.item.category'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if ($cart) {
            return new CartResource($cart);
        }

        $cart = Cart::create([
            'user_id' => $user->id,
            'total_quantity' => 0,
            'total_price' => 0,
            'status' => 'active',
        ]);

        $cart->load(['items.item.uploads', 'items.item.category']);

        return new CartResource($cart);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to cart.');
        }

        $cart->load(['items.item.uploads', 'items.item.category']);

        return new CartResource($cart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to cart.');
        }

        $cart->update($request->validated());

        return new CartResource(
            $cart->load(['items.item.uploads', 'items.item.category'])
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to cart.');
        }

        $cart->delete();

        return response()->json(['message' => 'Cart deleted successfully.']);
    }
}
