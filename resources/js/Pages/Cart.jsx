import { useState } from "react";
import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import Card from "@/Components/UI/Card";
import CartItemRow from "@/Components/Cart/CartItemRow";
import { useCart } from "@/Context/CartContext";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function Cart() {
    const { cart, loading, removeItem } = useCart();
    const [removingId, setRemovingId] = useState(null);

    const items = cart?.items ?? [];

    const handleRemove = (cartItemId) => {
        setRemovingId(cartItemId);
        removeItem(cartItemId);
    };

    const subtotal = items.reduce(
        (sum, ci) => sum + Number(ci.total_price ?? 0),
        0
    );

    return (
        <GuestLayout>
            <Section>
                <Container>
                    <div className="mb-8">
                        <Link
                            href={route("products")}
                            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>

                    <div className="mb-10">
                        <span className="inline-block w-fit rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
                            Your Cart
                        </span>
                        <h1 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                            Shopping Cart
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Review the items in your cart and adjust quantities before checkout.
                        </p>
                    </div>

                    {items.length === 0 ? (
                        <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
                            <ShoppingBag size={64} className="mb-6 text-slate-300" />
                            <h2 className="text-xl font-semibold text-slate-700">
                                Your cart is empty
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                Browse our products and add items you love. Your cart
                                will be waiting for you when you're ready.
                            </p>
                            <Link href={route("products")} className="mt-8">
                                <Button size="lg">
                                    Browse Products
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Cart items */}
                            <div className="space-y-4 lg:col-span-2">
                                {items.map((cartItem) => (
                                    <CartItemRow
                                        key={cartItem.id}
                                        cartItem={cartItem}
                                        removing={removingId === cartItem.id}
                                        onRemove={() => handleRemove(cartItem.id)}
                                    />
                                ))}
                            </div>

                            {/* Summary panel */}
                            <div>
                                <Card className="p-6 lg:sticky lg:top-28">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Order Summary
                                    </h2>

                                    <div className="mt-5 space-y-3 text-sm">
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Items</span>
                                            <span className="font-medium">
                                                {items.length}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Total Quantity</span>
                                            <span className="font-medium">
                                                {cart?.total_quantity ?? 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">
                                                ₦{subtotal.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-slate-200 pt-5">
                                        <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                                            <span>Total</span>
                                            <span className="text-primary-600">
                                                ₦{Number(cart?.total_price ?? subtotal).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-right text-xs text-slate-400">
                                            Shipping calculated at checkout
                                        </p>
                                    </div>

                                    <Link href={route("checkout")} className="mt-6 block">
                                        <Button size="lg" className="w-full" disabled={loading}>
                                            {loading ? "Updating..." : "Proceed to Checkout"}
                                        </Button>
                                    </Link>

                                    <Link href={route("products")} className="mt-3 block">
                                        <Button variant="outline" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    )}
                </Container>
            </Section>
        </GuestLayout>
    );
}
