import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

export default function NavLink({
    href,
    active = false,
    children,
}) {
    return (
        <Link
            href={href}
            className={cn(
                "relative text-sm font-medium transition-colors duration-300",
                active
                    ? "text-primary-600"
                    : "text-slate-700 hover:text-primary-600"
            )}
        >
            {children}
        </Link>
    );
}