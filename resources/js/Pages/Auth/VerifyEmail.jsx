import { Head, useForm, Link } from "@inertiajs/react";
import { LogOut, MailCheck } from "lucide-react";

import GuestLayout from "@/Layouts/GuestLayout";
import AuthCard from "@/Components/Auth/AuthCard";
import Button from "@/Components/UI/Button";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <AuthCard
                title="Verify your email"
                subtitle="One more step to start ordering premium hospitality supplies."
            >
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                        <MailCheck size={32} className="text-primary-600" />
                    </div>
                </div>

                <p className="mt-6 text-center text-sm leading-6 text-slate-600">
                    Thanks for signing up! Before getting started, please verify
                    your email address by clicking the link we just sent to
                    your inbox. If you didn't receive the email, we can send
                    you another one.
                </p>

                {status === "verification-link-sent" && (
                    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                        A new verification link has been sent to your email address.
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-4">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                        size="lg"
                    >
                        {processing
                            ? "Sending..."
                            : "Resend Verification Email"}
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                    >
                        <LogOut size={16} />
                        Log out
                    </Link>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
