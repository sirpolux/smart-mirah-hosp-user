import { ArrowRight } from "lucide-react";
import Card from "@/Components/UI/Card";

export default function CategoryCard({
    image,
    icon: Icon,
    name,
    description,
}) {
    return (
        <Card className="group overflow-hidden p-0">

            <div className="relative h-64 overflow-hidden">

                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-primary-600 shadow-lg">

                    <Icon size={28} />

                </div>

            </div>

            <div className="space-y-4 p-6">

                <h3 className="text-xl font-semibold">
                    {name}
                </h3>

                <p className="leading-7 text-slate-600">
                    {description}
                </p>

                <button className="flex items-center gap-2 font-medium text-primary-600 transition group-hover:gap-4">

                    Explore

                    <ArrowRight size={18} />

                </button>

            </div>

        </Card>
    );
}