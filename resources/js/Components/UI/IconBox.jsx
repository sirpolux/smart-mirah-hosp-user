import { cn } from "@/lib/utils";

export default function IconBox({
    icon: Icon,
    className = "",
}) {
    return (
        <div
            className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600",
                className
            )}
        >
            <Icon size={28} />
        </div>
    );
}