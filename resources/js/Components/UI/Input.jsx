import { cn } from "@/lib/utils";

export default function Input({
    label,
    type = "text",
    placeholder,
    className = "",
    ...props
}) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={cn(
                    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100",
                    className
                )}
                {...props}
            />
        </div>
    );
}
