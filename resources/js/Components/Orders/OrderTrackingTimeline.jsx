import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { ORDER_TRACKING_STAGES } from "@/data/orderStatus";

export default function OrderTrackingTimeline({
    trackingIndex = 0,
    orderStatus = "pending",
    className = "",
}) {
    const cancelled = orderStatus === "cancelled";

    return (
        <div className={cn("w-full", className)}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Order Tracking
            </h3>

            {cancelled ? (
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                    <XCircle size={20} />
                    This order was cancelled.
                </div>
            ) : (
                <div className="mt-6 grid grid-cols-4 gap-2">
                    {ORDER_TRACKING_STAGES.map((stage, index) => {
                        const currentIndex = index + 1;
                        const isReached = currentIndex <= trackingIndex;
                        const isCurrent = currentIndex === trackingIndex;

                        return (
                            <div key={stage.key} className="flex flex-col items-center text-center">
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                                        isReached
                                            ? "border-primary-600 bg-primary-600 text-white"
                                            : "border-slate-300 bg-white text-slate-400"
                                    )}
                                >
                                    {isReached && !isCurrent ? (
                                        <CheckCircle2 size={20} />
                                    ) : (
                                        <Circle size={16} />
                                    )}
                                </div>
                                <p
                                    className={cn(
                                        "mt-2 text-xs font-semibold sm:text-sm",
                                        isCurrent
                                            ? "text-primary-700"
                                            : isReached
                                            ? "text-slate-800"
                                            : "text-slate-400"
                                    )}
                                >
                                    {stage.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
                {orderStatus === "pending"
                    ? "Your order is waiting for payment confirmation."
                    : `Current status: ${orderStatus}.`}
            </p>
        </div>
    );
}
