import { cn } from "@/lib/utils";

export default function Badge({
    children,
    className = "",
}) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-700",
                className
            )}
        >
            {children}
        </span>
    );
}