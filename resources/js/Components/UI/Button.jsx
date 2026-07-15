import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary-600 text-white hover:bg-primary-700",

                secondary:
                    "bg-slate-900 text-white hover:bg-slate-800",

                outline:
                    "border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white",

                ghost:
                    "hover:bg-slate-100 text-slate-700",
            },

            size: {
                sm: "h-10 px-4 text-sm",

                md: "h-12 px-6",

                lg: "h-14 px-8 text-lg",

                icon: "h-12 w-12",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export default function Button({
    className,
    variant,
    size,
    children,
    ...props
}) {
    return (
        <button
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}