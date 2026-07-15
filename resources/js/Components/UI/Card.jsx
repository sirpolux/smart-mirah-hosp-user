import { cn } from "@/lib/utils";

export default function Card({
    children,
    className = "",
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg",
                className
            )}
        >
            {children}
        </div>
    );
}