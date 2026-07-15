import { cn } from "@/lib/utils";

export default function Container({
    children,
    className = "",
    as: Component = "div",
}) {
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-7xl px-6 lg:px-8",
                className
            )}
        >
            {children}
        </Component>
    );
}