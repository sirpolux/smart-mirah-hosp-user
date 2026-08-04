import { Link, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import Card from "@/Components/UI/Card";
import OrderStatusBadge from "@/Components/Orders/OrderStatusBadge";
import OrderTrackingTimeline from "@/Components/Orders/OrderTrackingTimeline";
import PaymentSection from "@/Components/Orders/PaymentSection";
import { CheckCircle, ArrowLeft, ShoppingBag, MapPin, Phone, Truck, XCircle } from "lucide-react";

export default function OrderDetail({ order, accounts = [] }) {
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
                    <div className="mx-auto max-w-4xl">
                        {/* Back link */}
                        <Link
                            href={route("orders.index")}
                            className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Orders</span>
                        </Link>

                        {/* Flash messages */}
                        {flash?.success && (
                            <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                                <CheckCircle size={40} className="mx-auto mb-3 text-green-500" />
                                <p className="font-semibold text-green-800">{flash.success}</p>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                                <XCircle size={40} className="mx-auto mb-3 text-red-500" />
                                <p className="font-semibold text-red-800">{flash.error}</p>
                            </div>
                        )}

                        {/* Receipt card */}
                        <Card className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Order Receipt</h1>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Reference:{" "}
                                        <span className="font-mono font-semibold text-primary-600">
                                            {order.receipt_ref}
                                        </span>
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Placed on{" "}
                                        {new Date(order.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <OrderStatusBadge status={order.status} />
                            </div>

                            {/* Items */}
                            <div className="mt-6 space-y-4">
                                {(order.items ?? []).map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                {item.item?.image ? (
                                                    <img
                                                        src={item.item.image}
                                                        alt={item.item.item_name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ShoppingBag size={20} className="text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {item.item?.item_name ?? "Product"}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Qty: {item.quantity} × ₦{Number(item.unit_price).toLocaleString()}
                                                </p>
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

                            {/* Delivery details */}
                            {order.delivery_address && (
                                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                                    <p className="flex items-center gap-2 font-semibold text-slate-800">
                                        <MapPin size={16} />
                                        Delivery Details
                                    </p>
                                    <p className="mt-2">
                                        {order.delivery_address}, {order.delivery_state}
                                    </p>
                                    <p className="mt-1 flex items-center gap-2">
                                        <Phone size={14} />
                                        {order.contact_number}
                                    </p>
                                    <p className="mt-1 flex items-center gap-2">
                                        <Truck size={14} />
                                        Channel:{" "}
                                        <span className="capitalize">{order.delivery_channel}</span>
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Tracking timeline */}
                        <Card className="mt-6 p-6 sm:p-8">
                            <OrderTrackingTimeline
                                trackingIndex={order.tracking_index ?? 0}
                                orderStatus={order.status}
                            />
                        </Card>

                        {/* Payment + evidence */}
                        <div className="mt-6">
                            <PaymentSection order={order} accounts={accounts} />
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link href={route("orders.index")}>
                                <Button variant="outline">All Orders</Button>
                            </Link>
                            <Link href={route("products")}>
                                <Button>Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </GuestLayout>
    );
}
