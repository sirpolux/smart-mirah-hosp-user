import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useCart } from "@/Context/CartContext";

export default function ProductCard({
    id,
    image,
    category_name,
    category,
    item_name,
    price,
}) {
    const { addToCart, loading } = useCart();
    const [imgError, setImgError] = useState(false);
    const displayImage = image && !imgError ? image : null;
    const displayCategory = category_name || category?.name || "General";

    const handleAddToCart = () => {
        addToCart(id, 1);
    };

    const handleViewDetail = () => {
        router.visit(route("products.show", id));
    };

    return (
        <Card className="group overflow-hidden p-0">

            <div className="relative overflow-hidden">

                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={item_name}
                        onError={() => setImgError(true)}
                        className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-72 w-full items-center justify-center bg-slate-100 text-slate-400">
                        <ShoppingBag size={48} />
                    </div>
                )}

                <div className="absolute right-4 top-4 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                    {displayCategory}
                </div>

            </div>

            <div className="space-y-5 p-6">

                <h3 className="text-xl font-semibold">
                    {item_name}
                </h3>

                <p className="text-2xl font-bold text-primary-600">
                    ₦{Number(price).toLocaleString()}
                </p>

                <div className="flex gap-3">

                    <Button
                        className="flex-1"
                        onClick={handleAddToCart}
                        disabled={loading}
                    >
                        <ShoppingBag size={18} />

                        <span className="ml-2">
                            {loading ? "Adding..." : "Quote"}
                        </span>
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleViewDetail}
                    >
                        <Eye size={18} />
                    </Button>

                </div>

            </div>

        </Card>
    );
}
