import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, LogIn } from "lucide-react";

import GuestLayout from "@/Layouts/GuestLayout";
import AuthCard from "@/Components/Auth/AuthCard";
import AuthInput from "@/Components/Auth/AuthInput";
import Button from "@/Components/UI/Button";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <AuthCard
                title="Welcome back"
                subtitle="Sign in to your SmartMirah account to continue."
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
                        autoComplete="username"
                        isFocused
                        required
                    />

                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        icon={Lock}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500/20"
                            />
                            <span className="text-sm text-slate-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

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
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <LogIn size={18} />
                                Sign in
                            </span>
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            href={route("register")}
                            className="font-semibold text-primary-600 hover:text-primary-700"
                        >
                            Create one
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
