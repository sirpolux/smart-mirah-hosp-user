import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, ArrowLeft } from "lucide-react";

import GuestLayout from "@/Layouts/GuestLayout";
import AuthCard from "@/Components/Auth/AuthCard";
import AuthInput from "@/Components/Auth/AuthInput";
import Button from "@/Components/UI/Button";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <AuthCard
                title="Reset your password"
                subtitle="Enter your email address and we'll send you a link to reset your password."
            >
                {status && (
                    <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <AuthInput
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        icon={Mail}
                        placeholder="you@example.com"
                        isFocused
                        required
                    />

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                        size="lg"
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Sending link...
                            </span>
                        ) : (
                            "Send reset link"
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                        <Link
                            href={route("login")}
                            className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700"
                        >
                            <ArrowLeft size={16} />
                            Back to sign in
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
