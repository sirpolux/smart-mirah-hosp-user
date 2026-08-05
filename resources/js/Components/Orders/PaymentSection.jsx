import { useState } from "react";
import { router } from "@inertiajs/react";
import {
    UploadCloud,
    Loader2,
    Banknote,
    FileText,
    Image as ImageIcon,
    X,
    CheckCircle2,
} from "lucide-react";
import Button from "@/Components/UI/Button";
import Card from "@/Components/UI/Card";
import OrderStatusBadge from "@/Components/Orders/OrderStatusBadge";
import { isOrderLocked } from "@/data/orderStatus";

const naira = (value) => `₦${Number(value ?? 0).toLocaleString()}`;

function AccountCard({ account }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            {account.is_primary_account && (
                <span className="mb-2 inline-flex rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-700">
                    Primary
                </span>
            )}
            <p className="font-semibold text-slate-900">{account.account_name}</p>
            <p className="mt-1 font-mono text-lg font-bold tracking-wider text-primary-700">
                {account.account_number}
            </p>
            <p className="text-sm text-slate-500">{account.bank_name}</p>
        </div>
    );
}

function EvidencePreview({ upload }) {
    const isImage = upload.file_type?.startsWith("image/");

    return (
        <a
            href={upload.file_path}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
        >
            {isImage ? (
                <img
                    src={upload.file_path}
                    alt="Payment evidence"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            ) : (
                <FileText size={24} className="text-slate-400" />
            )}
        </a>
    );
}

export default function PaymentSection({ order, accounts = [] }) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const locked = isOrderLocked(order.data.status);
    const transactions = order.data.transactions ?? [];

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] ?? null);
        setErrors((prev) => ({ ...prev, evidence: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setErrors((prev) => ({ ...prev, evidence: "Please select a file." }));
            return;
        }

        setSubmitting(true);
        setErrors({});

        const formData = new FormData();
        formData.append("order_id", order.data.id);
        formData.append("evidence", file);
        formData.append("description", description);

        router.post(route("transactions.store"), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setFile(null);
                setDescription("");
                setSubmitting(false);
            },
            onError: (errs) => {
                setErrors(errs);
                setSubmitting(false);
            },
        });
    };

    return (
        <Card className="p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Banknote size={20} className="text-primary-600" />
                Payment & Evidence
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Payment details */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Transfer To
                    </h3>
                    {accounts.length > 0 ? (
                        <div className="mt-3 space-y-3">
                            {accounts.map((account) => (
                                <AccountCard key={account.id} account={account} />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-3 text-sm text-slate-500">
                            No payment account available yet.
                        </p>
                    )}

                    <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">
                        Order total to pay:{" "}
                        <span className="font-bold">{naira(order.data.total_price)}</span>
                    </p>
                </div>

                {/* Upload form */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {transactions.length === 0
                            ? "Upload Payment Evidence"
                            : "Upload Another Evidence"}
                    </h3>

                    {locked ? (
                        <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-500">
                            Payment evidence upload is closed for this order.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-3 space-y-4">
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50">
                                {file ? (
                                    <>
                                        {file.type.startsWith("image/") ? (
                                            <ImageIcon size={28} className="text-primary-600" />
                                        ) : (
                                            <FileText size={28} className="text-primary-600" />
                                        )}
                                        <p className="mt-2 text-sm font-medium text-slate-700">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <span
                                            role="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFile(null);
                                            }}
                                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-500"
                                        >
                                            <X size={14} />
                                            Remove
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud size={28} className="text-slate-400" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700">
                                            Click to select receipt / transfer screenshot
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            JPG, PNG, WEBP or PDF (max 5MB)
                                        </p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,application/pdf"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                            </label>
                            {errors.evidence && (
                                <p className="text-xs text-red-500">{errors.evidence}</p>
                            )}

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                placeholder="Optional note (e.g. sender name, reference)"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500">{errors.description}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload Evidence"
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            {/* Transaction history */}
            {transactions.length > 0 && (
                <div className="mt-8 border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Payment History
                    </h3>

                    <div className="mt-4 space-y-4">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 p-4"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {(transaction.uploads ?? []).map((upload) => (
                                        <EvidencePreview key={upload.id} upload={upload} />
                                    ))}
                                </div>

                                <div className="min-w-[140px] flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-800">
                                            {naira(transaction.amount)}
                                        </span>
                                        <OrderStatusBadge
                                            status={transaction.status}
                                            type="transaction"
                                        />
                                    </div>
                                    {transaction.description && (
                                        <p className="mt-1 text-xs text-slate-500">
                                            {transaction.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-slate-400">
                                        Uploaded{" "}
                                        {new Date(transaction.created_at).toLocaleString()}
                                    </p>
                                    {transaction.status === "rejected" && (
                                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <X size={12} />
                                            Rejected — please upload a valid evidence.
                                        </p>
                                    )}
                                    {transaction.status === "confirmed" && (
                                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
                                            <CheckCircle2 size={12} />
                                            Confirmed
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
