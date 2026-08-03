import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import { ShoppingBag, ArrowLeft, ChevronLeft } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import { useMemo, useState } from "react";

export default function ProductDetail({ product }) {
    const { addToCart, loading } = useCart();
    const [qty, setQty] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [imgError, setImgError] = useState(false);
    const [failedThumbs, setFailedThumbs] = useState([]);

    const images = useMemo(() => {
        const rawImages = product?.data?.image;
        const list = Array.isArray(rawImages) ? rawImages : rawImages?.data;

        return (Array.isArray(list) ? list : [])
            .filter((image) => image?.file_path)
            .sort((a, b) => {
                if (!!a.is_primary !== !!b.is_primary) {
                    return a.is_primary ? -1 : 1;
                }
                return (a.position ?? 0) - (b.position ?? 0);
            });
    }, [product]);

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

    const safeActiveIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
    const activeImage = images[safeActiveIndex];

    const handleSelectImage = (index) => {
        setActiveIndex(index);
        setImgError(false);
    };

    const handleThumbError = (index) => {
        setFailedThumbs((prev) => (prev.includes(index) ? prev : [...prev, index]));
    };

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
                        {/* Image gallery */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                {activeImage && !imgError ? (
                                    <img
                                        src={activeImage.file_path}
                                        alt={product.data.item_name}
                                        onError={() => setImgError(true)}
                                        className="max-h-[480px] w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-96 w-full items-center justify-center text-slate-300">
                                        <ShoppingBag size={80} />
                                    </div>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="flex flex-wrap gap-3">
                                    {images.map((image, index) =>
                                        failedThumbs.includes(index) ? null : (
                                            <button
                                                key={image.id ?? index}
                                                type="button"
                                                onClick={() => handleSelectImage(index)}
                                                className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-slate-100 transition-colors ${
                                                    index === safeActiveIndex
                                                        ? "border-primary-500 ring-2 ring-primary-200"
                                                        : "border-slate-200 hover:border-primary-300"
                                                }`}
                                            >
                                                <img
                                                    src={image.file_path}
                                                    alt={`${product.data.item_name} thumbnail ${index + 1}`}
                                                    onError={() => handleThumbError(index)}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-center">
                            {product.data.category.name && (
                                <span className="inline-block w-fit rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
                                    {product.data.category.name}
                                </span>
                            )}

                            <h1 className="mt-4 text-3xl font-bold text-slate-900">
                                {product.data.item_name}
                            </h1>

                            <p className="mt-2 text-4xl font-bold text-primary-600">
                                ₦{Number(product.data.price).toLocaleString()}
                            </p>

                            {product.data.manufacturer && (
                                <p className="mt-2 text-sm text-slate-500">
                                    Manufacturer: <span className="font-medium text-slate-700">{product.data.manufacturer}</span>
                                </p>
                            )}

                            {product.data.item_description && (
                                <p className="mt-6 leading-relaxed text-slate-600">
                                    {product.data.item_description}
                                </p>
                            )}

                            {/* Details list */}
                            {product.data.details && product.data.details.length > 0 && (
                                <div className="mt-6 space-y-2">
                                    {product.data.details.map((detail) => (
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
                                    onClick={() => addToCart(product.data.id, qty)}
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
