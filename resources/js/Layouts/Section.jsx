import { cn } from "@/lib/utils";

export default function Section({
    children,
    className = "",
    as: Component = "section",
    id,
}) {
    return (
        <Component
            id={id}
            className={cn(
                "py-20 lg:py-28",
                className
            )}
        >
            {children}
        </Component>
    );
}