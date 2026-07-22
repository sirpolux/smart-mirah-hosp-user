<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display the checkout page with the user's active cart.
     */
    public function checkout()
    {
        $user = Auth::user();
        $cart = Cart::with(['items.item.uploads', 'items.item.category'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        return Inertia::render('Checkout', [
            'cart' => $cart ? new CartResource($cart) : null,
        ]);
    }

    /**
     * Display a listing of the user's orders.
     */
    public function index()
    {
        $user = Auth::user();

        $orders = Order::with(['items.item.uploads', 'items.item.category'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Checkout: convert active cart into an order.
     */
    public function store(StoreOrderRequest $request)
    {
        $user = Auth::user();

        $cart = Cart::with(['items.item'])
            ->where('id', $request->cart_id)
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if (!$cart) {
            return Redirect::back()->with('flash', [
                'error' => 'Active cart not found.',
            ]);
        }

        if ($cart->items->isEmpty()) {
            return Redirect::back()->with('flash', [
                'error' => 'Cannot checkout an empty cart.',
            ]);
        }

        DB::beginTransaction();

        try {
            $receiptRef = 'ORD-' . strtoupper(uniqid());

            $order = Order::create([
                'user_id' => $user->id,
                'total_quantity' => $cart->total_quantity,
                'total_price' => $cart->total_price,
                'status' => 'pending',
                'contact_number' => $request->contact_number,
                'delivery_address' => $request->delivery_address,
                'delivery_state' => $request->delivery_state,
                'delivery_channel' => $request->delivery_channel,
                'receipt_ref' => $receiptRef,
            ]);

            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $cartItem->item_id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->unit_price,
                    'total_price' => $cartItem->total_price,
                ]);
            }

            // Mark cart as completed
            $cart->update(['status' => 'completed']);

            DB::commit();

            return Redirect::route('orders.show', $order)->with('flash', [
                'success' => 'Order placed successfully! Your receipt ref: ' . $receiptRef,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return Redirect::back()->with('flash', [
                'error' => 'Checkout failed. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to order.');
        }

        $order->load(['items.item.uploads', 'items.item.category']);

        return Inertia::render('OrderDetail', [
            'order' => $order,
        ]);
    }
}
