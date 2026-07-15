import { X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { Link } from "@inertiajs/react";
import Button from "../UI/Button";

export default function MobileMenu({
    open,
    onClose,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">

            <div className="flex items-center justify-between border-b p-6">

                <h3 className="text-xl font-bold">
                    Menu
                </h3>

                <button onClick={onClose}>
                    <X />
                </button>

            </div>

            <div className="flex flex-col p-6 gap-6">

                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                    >
                        {item.name}
                    </Link>
                ))}

                <Button className="mt-4">
                    Request Quote
                </Button>

            </div>

        </div>
    );
}