import { cn } from "@/lib/utils";

export default function Heading({
    children,
    className = "",
}) {
    return (
        <h2
            className={cn(
                "text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl",
                className
            )}
        >
            {children}
        </h2>
    );
}