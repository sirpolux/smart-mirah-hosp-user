import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, KeyRound } from "lucide-react";

import GuestLayout from "@/Layouts/GuestLayout";
import AuthCard from "@/Components/Auth/AuthCard";
import AuthInput from "@/Components/Auth/AuthInput";
import Button from "@/Components/UI/Button";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <AuthCard
                title="Set new password"
                subtitle="Choose a strong password for your account."
            >
                <form onSubmit={submit} className="space-y-5">
                    <AuthInput
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        icon={Mail}
                        autoComplete="username"
                        disabled
                        required
                    />

                    <AuthInput
                        id="password"
                        label="New Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        icon={Lock}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        isFocused
                        required
                    />

                    <AuthInput
                        id="password_confirmation"
                        label="Confirm New Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                        icon={Lock}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
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
                                Resetting password...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <KeyRound size={18} />
                                Reset password
                            </span>
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                        <Link
                            href={route("login")}
                            className="font-medium text-primary-600 hover:text-primary-700"
                        >
                            Back to sign in
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
