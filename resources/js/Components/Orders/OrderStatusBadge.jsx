import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABELS, TRANSACTION_STATUS_LABELS } from "@/data/orderStatus";

const STATUS_STYLES = {
    pending: "bg-yellow-100 text-yellow-700",
    received: "bg-blue-100 text-blue-700",
    packaged: "bg-indigo-100 text-indigo-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    confirmed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-orange-100 text-orange-700",
};

const LABELS = {
    ...ORDER_STATUS_LABELS,
    ...TRANSACTION_STATUS_LABELS,
};

export default function OrderStatusBadge({
    status,
    type = "order",
    className = "",
}) {
    const label = LABELS[status] ?? status;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
                STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700",
                className
            )}
        >
            {label}
        </span>
    );
}
