import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, User, UserPlus } from "lucide-react";

import GuestLayout from "@/Layouts/GuestLayout";
import AuthCard from "@/Components/Auth/AuthCard";
import AuthInput from "@/Components/Auth/AuthInput";
import Button from "@/Components/UI/Button";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <AuthCard
                title="Create your account"
                subtitle="Join SmartMirah and start ordering premium hospitality supplies."
            >
                <form onSubmit={submit} className="space-y-5">
                    <AuthInput
                        id="name"
                        label="Full Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        icon={User}
                        placeholder="John Doe"
                        autoComplete="name"
                        isFocused
                        required
                    />

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
                        placeholder="Create a password"
                        autoComplete="new-password"
                        required
                    />

                    <AuthInput
                        id="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                        icon={Lock}
                        placeholder="Confirm your password"
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
                                Creating account...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <UserPlus size={18} />
                                Create account
                            </span>
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            href={route("login")}
                            className="font-semibold text-primary-600 hover:text-primary-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
