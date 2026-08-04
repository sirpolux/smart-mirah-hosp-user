import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import OrderStatusBadge from "@/Components/Orders/OrderStatusBadge";
import { ShoppingBag, ChevronLeft, ChevronRight, PackageOpen, Eye } from "lucide-react";

const naira = (value) => `₦${Number(value ?? 0).toLocaleString()}`;

export default function Orders({ orders }) {
    const orderList = orders?.data ?? [];
    const pagination = orders?.meta ?? null;

    return (
        <GuestLayout>
            <Section>
                <Container>
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="inline-block w-fit rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
                                My Orders
                            </span>
                            <h1 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                                Order History
                            </h1>
                            <p className="mt-2 text-slate-500">
                                Track your orders, upload payment evidence, and view delivery updates.
                            </p>
                        </div>

                        <Link href={route("products")}>
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                    </div>

                    {orderList.length === 0 ? (
                        <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
                            <PackageOpen size={64} className="mb-6 text-slate-300" />
                            <h2 className="text-xl font-semibold text-slate-700">
                                No orders yet
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                When you place an order, it will show up here so you can track
                                its status and upload payment evidence.
                            </p>
                            <Link href={route("products")} className="mt-8">
                                <Button size="lg">Start Shopping</Button>
                            </Link>
                        </Card>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {orderList.map((order) => (
                                    <Card key={order.id} className="p-5 sm:p-6">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                                                <ShoppingBag size={22} />
                                            </div>

                                            <div className="min-w-[180px] flex-1">
                                                <p className="font-mono text-sm font-bold text-slate-900">
                                                    {order.receipt_ref}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {new Date(order.created_at).toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}{" "}
                                                    · {order.total_quantity} item(s)
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-bold text-slate-900">
                                                    {naira(order.total_price)}
                                                </p>
                                                <div className="mt-1">
                                                    <OrderStatusBadge status={order.status} />
                                                </div>
                                            </div>

                                            <Link
                                                href={route("orders.show", order.id)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
                                            >
                                                <Eye size={16} />
                                                View Order
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {pagination && pagination.last_page > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-2">
                                    {pagination.links?.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 opacity-40"
                                                >
                                                    {link.label === "&laquo; Previous" ? (
                                                        <ChevronLeft size={18} />
                                                    ) : link.label === "&raquo; Next" ? (
                                                        <ChevronRight size={18} />
                                                    ) : (
                                                        link.label
                                                    )}
                                                </span>
                                            );
                                        }

                                        if (link.label === "&laquo; Previous") {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary-600 hover:text-primary-600"
                                                >
                                                    <ChevronLeft size={18} />
                                                </Link>
                                            );
                                        }

                                        if (link.label === "&raquo; Next") {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary-600 hover:text-primary-600"
                                                >
                                                    <ChevronRight size={18} />
                                                </Link>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
                                                    link.active
                                                        ? "border-primary-600 bg-primary-600 text-white"
                                                        : "border-slate-200 text-slate-600 hover:border-primary-600 hover:text-primary-600"
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </Section>
        </GuestLayout>
    );
}
