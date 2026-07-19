<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CartItemController extends Controller
{
    /**
     * Add an item to the active cart (or increment qty if already in cart).
     */
    public function store(StoreCartItemRequest $request)
    {
        $user = Auth::user();

        // Get or create active cart
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id, 'status' => 'active'],
            ['total_quantity' => 0, 'total_price' => 0]
        );

        $item = Item::findOrFail($request->item_id);

        // Check if item already exists in cart
        $existingItem = CartItem::where('cart_id', $cart->id)
            ->where('item_id', $request->item_id)
            ->first();

        if ($existingItem) {
            $newQty = $existingItem->quantity + $request->quantity;
            $existingItem->update([
                'quantity' => $newQty,
                'total_price' => $newQty * $existingItem->unit_price,
            ]);

            $this->recalculateCartTotals($cart);

            return Redirect::back()->with('flash', [
                'success' => '"' . $item->item_name . '" quantity updated in cart.',
            ]);
        }

        $unitPrice = (float) $item->price;
        $quantity = $request->quantity;

        CartItem::create([
            'cart_id' => $cart->id,
            'item_id' => $item->id,
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_price' => $quantity * $unitPrice,
        ]);

        $this->recalculateCartTotals($cart);

        return Redirect::back()->with('flash', [
            'success' => '"' . $item->item_name . '" added to cart.',
        ]);
    }

    /**
     * Update quantity of a cart item.
     */
    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    {
        $cart = $cartItem->cart;

        if ($cart->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to cart.');
        }

        if ($cart->status !== 'active') {
            return Redirect::back()->with('flash', [
                'error' => 'Cannot update items in a completed or cancelled cart.',
            ]);
        }

        $cartItem->update([
            'quantity' => $request->quantity,
            'total_price' => $request->quantity * $cartItem->unit_price,
        ]);

        $this->recalculateCartTotals($cart);

        return Redirect::back()->with('flash', [
            'success' => 'Cart item quantity updated.',
        ]);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(CartItem $cartItem)
    {
        $cart = $cartItem->cart;

        if ($cart->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to cart.');
        }

        $cartItem->delete();

        $this->recalculateCartTotals($cart);

        return Redirect::back()->with('flash', [
            'success' => 'Item removed from cart.',
        ]);
    }

    /**
     * Recalculate cart total quantity and total price.
     */
    private function recalculateCartTotals(Cart $cart): void
    {
        $items = CartItem::where('cart_id', $cart->id)->get();

        $totalQuantity = $items->sum('quantity');
        $totalPrice = $items->sum('total_price');

        $cart->update([
            'total_quantity' => $totalQuantity,
            'total_price' => $totalPrice,
        ]);
    }
}
