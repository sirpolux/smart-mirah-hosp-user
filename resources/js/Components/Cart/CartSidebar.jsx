import { Fragment } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { useCart } from "@/Context/CartContext";

export default function CartSidebar({ open, onClose }) {
    const { cart, loading, itemCount, updateQuantity, removeItem, clearCart } = useCart();

    const items = cart?.items ?? [];

    const handleCheckout = () => {
        onClose();
        router.visit(route("checkout"));
    };

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-primary-600" />
                        <h2 className="text-lg font-semibold">
                            Cart ({itemCount})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {loading && items.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <Loader2 size={32} className="animate-spin mb-4" />
                            <p>Loading cart...</p>
                        </div>
                    )}

                    {!loading && items.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <ShoppingBag size={48} className="mb-4 text-slate-300" />
                            <p className="text-lg font-medium text-slate-600">Your cart is empty</p>
                            <p className="mt-2 text-sm text-slate-400">
                                Browse our products and add items you love.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    onClose();
                                    router.visit(route("products"));
                                }}
                            >
                                Browse Products
                            </Button>
                        </div>
                    )}

                    {items.length > 0 && (
                        <ul className="space-y-4">
                            {items.map((cartItem) => (
                                <li
                                    key={cartItem.id}
                                    className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3"
                                >
                                    {/* Image */}
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                                        {cartItem.item?.image ? (
                                            <img
                                                src={cartItem.item.image}
                                                alt={cartItem.item.item_name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-slate-400">
                                                <ShoppingBag size={24} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-800">
                                                {cartItem.item?.item_name ?? "Product"}
                                            </h4>
                                            <p className="mt-0.5 text-sm font-bold text-primary-600">
                                                ₦{Number(cartItem.unit_price).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white">
                                                <button
                                                    onClick={() => {
                                                        if (cartItem.quantity > 1) {
                                                            updateQuantity(cartItem.id, cartItem.quantity - 1);
                                                        }
                                                    }}
                                                    disabled={cartItem.quantity <= 1}
                                                    className="flex h-7 w-7 items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-l-lg"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="flex h-7 min-w-[2rem] items-center justify-center text-sm font-medium">
                                                    {cartItem.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                                    className="flex h-7 w-7 items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(cartItem.id)}
                                                className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-slate-200 px-6 py-4 space-y-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary-600">
                                ₦{Number(cart?.total_price ?? 0).toLocaleString()}
                            </span>
                        </div>
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
