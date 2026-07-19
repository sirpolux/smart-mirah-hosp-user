import { Link, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import { CheckCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export default function OrderDetail({ order }) {
    const { flash } = usePage().props;

    if (!order) {
        return (
            <GuestLayout>
                <Section>
                    <Container>
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg text-slate-500">Order not found.</p>
                            <Link href={route("products")} className="mt-6">
                                <Button variant="outline">Back to Products</Button>
                            </Link>
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
                    <div className="mx-auto max-w-2xl">
                        {/* Flash success */}
                        {flash?.success && (
                            <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                                <p className="text-lg font-semibold text-green-800">{flash.success}</p>
                            </div>
                        )}

                        {/* Receipt Header */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Order Receipt</h1>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Reference: <span className="font-mono font-semibold text-primary-600">{order.receipt_ref}</span>
                                    </p>
                                </div>
                                <span className="rounded-full bg-yellow-100 px-4 py-1 text-xs font-semibold text-yellow-700 uppercase">
                                    {order.status}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="mt-6 space-y-4">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                                <ShoppingBag size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {item.item?.item_name ?? "Product"}
                                                </p>
                                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium">
                                            ₦{Number(item.total_price).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary-600">
                                    ₦{Number(order.total_price).toLocaleString()}
                                </span>
                            </div>

                            {/* Delivery Details */}
                            {order.delivery_address && (
                                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                                    <p className="font-semibold text-slate-800">Delivery Details</p>
                                    <p className="mt-1">{order.delivery_address}, {order.delivery_state}</p>
                                    <p>Contact: {order.contact_number}</p>
                                    <p>Channel: <span className="capitalize">{order.delivery_channel}</span></p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
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
