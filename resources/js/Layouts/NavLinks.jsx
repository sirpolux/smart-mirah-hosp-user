import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { handleHashHref, isHash } from "@/lib/hashNavigation";

export default function NavLink({
    href,
    active = false,
    children,
}) {
    const classes = cn(
        "relative text-sm font-medium transition-colors duration-300",
        active
            ? "text-primary-600"
            : "text-slate-700 hover:text-primary-600"
    );

    if (isHash(href)) {
        return (
            <a
                href={href}
                onClick={(e) => handleHashHref(href, e)}
                className={classes}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={classes}
        >
            {children}
        </Link>
    );
}
