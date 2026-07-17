import { X, User } from "lucide-react";
import { navigation } from "@/data/navigation";
import { Link, usePage } from "@inertiajs/react";
import Button from "@/Components/UI/Button";

export default function MobileMenu({
    open,
    onClose,
}) {
    const user = usePage().props.auth?.user ?? null;

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
                        className="text-slate-700 font-medium"
                    >
                        {item.name}
                    </Link>
                ))}

                <hr className="border-slate-200" />

                {user ? (
                    <Link
                        href={route("dashboard")}
                        onClick={onClose}
                        className="flex items-center gap-2 font-medium text-slate-700"
                    >
                        <User size={18} />
                        {user.name}
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            onClick={onClose}
                            className="font-medium text-slate-700"
                        >
                            Sign In
                        </Link>

                        <Link
                            href={route("register")}
                            onClick={onClose}
                        >
                            <Button className="w-full">
                                Create Account
                            </Button>
                        </Link>
                    </>
                )}

                <Button variant="outline" className="w-full">
                    Request Quote
                </Button>

            </div>

        </div>
    );
}
