import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { Eye, ShoppingBag } from "lucide-react";

export default function ProductCard({
    image,
    category,
    name,
    price,
}) {
    return (
        <Card className="group overflow-hidden p-0">

            <div className="relative overflow-hidden">

                <img
                    src={image}
                    alt={name}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                    {category}
                </div>

            </div>

            <div className="space-y-5 p-6">

                <h3 className="text-xl font-semibold">
                    {name}
                </h3>

                <p className="text-2xl font-bold text-primary-600">
                    ₦{price.toLocaleString()}
                </p>

                <div className="flex gap-3">

                    <Button className="flex-1">
                        <ShoppingBag size={18} />

                        <span className="ml-2">
                            Quote
                        </span>
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <Eye size={18} />
                    </Button>

                </div>

            </div>

        </Card>
    );
}