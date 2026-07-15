import { Link } from "@inertiajs/react";

export default function Logo({
    className = "",
}) {
    return (
        <Link
            href={route("home")}
            className={`flex items-center gap-3 ${className}`}
        >
            <img
                src="/images/logo.png"
                alt="SmartMirah"
                className="h-10 w-auto"
            />
        </Link>
    );
}