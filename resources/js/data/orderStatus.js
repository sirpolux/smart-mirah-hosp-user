export const ORDER_STATUS_LABELS = {
    pending: "Pending",
    received: "Received",
    packaged: "Packaged",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

export const TRANSACTION_STATUS_LABELS = {
    pending: "Pending Upload/Verification",
    confirmed: "Payment Confirmed",
    rejected: "Payment Rejected",
    failed: "Payment Failed",
    refunded: "Refunded",
};

export const ORDER_TRACKING_STAGES = [
    { key: "received", label: "Received" },
    { key: "packaged", label: "Packaged" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
];

export const isOrderLocked = (status) =>
    status === "delivered" || status === "cancelled";
