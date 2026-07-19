import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useCart } from "@/Context/CartContext";

export default function Checkout({ cart: propCart }) {
    const { cart: contextCart, clearCart } = useCart();
    const { auth } = usePage().props;
    const cart = propCart ?? contextCart;
    const user = auth?.user;

    const [form, setForm] = useState({
        contact_number: user?.phone ?? "",
        delivery_address: "",
        delivery_state: "",
        delivery_channel: "delivery",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);

    const items = cart?.items ?? [];
    const totalPrice = cart?.total_price ?? 0;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        router.post(route("orders.store"), {
            cart_id: cart.id,
            ...form,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                setSuccess(page.props.flash?.success ?? "Order placed successfully!");
                clearCart();
                setSubmitting(false);
            },
            onError: (errs) => {
                setErrors(errs);
                setSubmitting(false);
            },
        });
    };

    if (success) {
        return (
            <GuestLayout>
                <Section>
                    <Container>
                        <div className="mx-auto max-w-lg py-20 text-center">
                            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
                            <h1 className="text-2xl font-bold text-slate-900">Order Placed!</h1>
                            <p className="mt-4 text-slate-600">{success}</p>
                            <div className="mt-8 flex items-center justify-center gap-4">
                                <Link href={route("products")}>
                                    <Button variant="outline">Continue Shopping</Button>
                                </Link>
                                <Link href={route("home")}>
                                    <Button>Back to Home</Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </Section>
            </GuestLayout>
        );
    }

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
                            <span>Back to Products</span>
                        </Link>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-5">
                        {/* Order Summary */}
                        <div className="lg:col-span-2 lg:order-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="text-lg font-semibold">Order Summary</h2>

                                <ul className="mt-4 space-y-3">
                                    {items.map((ci) => (
                                        <li key={ci.id} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">
                                                {ci.item?.item_name ?? "Product"} <span className="text-slate-400">×{ci.quantity}</span>
                                            </span>
                                            <span className="font-medium">
                                                ₦{Number(ci.total_price).toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 border-t border-slate-200 pt-4">
                                    <div className="flex items-center justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary-600">
                                            ₦{Number(totalPrice).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Form */}
                        <div className="lg:col-span-3 lg:order-1">
                            <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
                            <p className="mt-2 text-slate-500">
                                Provide your delivery details to complete the order.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <InputLabel htmlFor="contact_number" value="Contact Number *" />
                                    <TextInput
                                        id="contact_number"
                                        name="contact_number"
                                        value={form.contact_number}
                                        onChange={handleChange}
                                        className="mt-1 w-full"
                                        required
                                    />
                                    <InputError message={errors.contact_number} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="delivery_address" value="Delivery Address *" />
                                    <textarea
                                        id="delivery_address"
                                        name="delivery_address"
                                        value={form.delivery_address}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        required
                                    />
                                    <InputError message={errors.delivery_address} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="delivery_state" value="State *" />
                                        <TextInput
                                            id="delivery_state"
                                            name="delivery_state"
                                            value={form.delivery_state}
                                            onChange={handleChange}
                                            className="mt-1 w-full"
                                            required
                                        />
                                        <InputError message={errors.delivery_state} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="delivery_channel" value="Delivery Channel" />
                                        <select
                                            id="delivery_channel"
                                            name="delivery_channel"
                                            value={form.delivery_channel}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                        >
                                            <option value="delivery">Door Delivery</option>
                                            <option value="pickup">Pickup Station</option>
                                        </select>
                                        <InputError message={errors.delivery_channel} />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={submitting || items.length === 0}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={20} className="mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        `Place Order — ₦${Number(totalPrice).toLocaleString()}`
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </Section>
        </GuestLayout>
    );
}
