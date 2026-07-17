import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

export default function AuthCard({
    children,
    title,
    subtitle,
    className = "",
}) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10",
                    className,
                )}
            >
                <div className="mb-8 text-center">
                    <Link href={route("home")} className="mx-auto block w-fit">
                        <img
                            src="/images/logo-with-name.png"
                            alt="SmartMirah"
                            className="mx-auto h-10 w-auto"
                        />
                    </Link>

                    {title && (
                        <h2 className="mt-6 text-2xl font-bold text-slate-900">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-600">
                            {subtitle}
                        </p>
                    )}
                </div>

                {children}
            </motion.div>
        </div>
    );
}
