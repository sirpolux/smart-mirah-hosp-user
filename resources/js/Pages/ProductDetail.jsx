import { Link, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import { ShoppingBag, Eye, ArrowLeft, ChevronLeft } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import { useState } from "react";

export default function ProductDetail({ product }) {
    const { addToCart, loading } = useCart();
    const [qty, setQty] = useState(1);
    const [imgError, setImgError] = useState(false);

    if (!product) {
        return (
            <GuestLayout>
                <Section>
                    <Container>
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg text-slate-500">Product not found.</p>
                            <Link href={route("products")} className="mt-6">
                                <Button variant="outline">
                                    <ArrowLeft size={18} className="mr-2" />
                                    Back to Products
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Section>
            </GuestLayout>
        );
    }

    const displayImage = product.image && !imgError ? product.image : null;

    return (
        <GuestLayout>
            <Section>
                <Container>
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href={route("products")}
                            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <ChevronLeft size={16} />
                            <span>Back to Products</span>
                        </Link>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Image */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                            {displayImage ? (
                                <img
                                    src={displayImage}
                                    alt={product.item_name}
                                    onError={() => setImgError(true)}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-96 items-center justify-center text-slate-300">
                                    <ShoppingBag size={80} />
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-center">
                            {product.category && (
                                <span className="inline-block w-fit rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
                                    {product.category.name}
                                </span>
                            )}

                            <h1 className="mt-4 text-3xl font-bold text-slate-900">
                                {product.item_name}
                            </h1>

                            <p className="mt-2 text-4xl font-bold text-primary-600">
                                ₦{Number(product.price).toLocaleString()}
                            </p>

                            {product.manufacturer && (
                                <p className="mt-2 text-sm text-slate-500">
                                    Manufacturer: <span className="font-medium text-slate-700">{product.manufacturer}</span>
                                </p>
                            )}

                            {product.item_description && (
                                <p className="mt-6 leading-relaxed text-slate-600">
                                    {product.item_description}
                                </p>
                            )}

                            {/* Details list */}
                            {product.details && product.details.length > 0 && (
                                <div className="mt-6 space-y-2">
                                    {product.details.map((detail) => (
                                        <div key={detail.id} className="flex items-center gap-2 text-sm text-slate-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                                            <span>{detail.data}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity + Add to cart */}
                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex items-center rounded-xl border border-slate-200">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        disabled={qty <= 1}
                                        className="flex h-12 w-12 items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-l-xl"
                                    >
                                        <span className="text-lg font-bold">−</span>
                                    </button>
                                    <span className="flex h-12 w-16 items-center justify-center font-semibold">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="flex h-12 w-12 items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-xl"
                                    >
                                        <span className="text-lg font-bold">+</span>
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="flex-1"
                                    disabled={loading}
                                    onClick={() => addToCart(product.id, qty)}
                                >
                                    <ShoppingBag size={20} className="mr-2" />
                                    {loading ? "Adding..." : "Add to Cart"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </GuestLayout>
    );
}
