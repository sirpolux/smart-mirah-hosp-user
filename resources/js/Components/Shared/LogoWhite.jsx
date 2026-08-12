import { Link } from "@inertiajs/react";

export default function LogoWhite({
    className = "",
}) {
    return (
        <Link
            href={route("home")}
            className={`flex items-center gap-3 ${className}`}
        >
            <img
                src="/images/smart-mira-hospitality-white-text-logo.png"
                alt="SmartMirah"
                className="h-10 w-auto"
            />
        </Link>
    );
}