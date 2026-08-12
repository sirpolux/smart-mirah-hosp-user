import { useForm } from "@inertiajs/react";
import { Send } from "lucide-react";

import Input from "@/Components/UI/Input";
import Button from "@/Components/UI/Button";
import InputError from "@/Components/InputError";

export default function ContactForm({ flash }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        website: "", // honeypot
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("contact.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            {flash?.success && (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {flash.success}
                </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Input
                        label="Company"
                        placeholder="Hotel Name"
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                        autoComplete="organization"
                    />
                    <InputError message={errors.company} className="mt-2" />
                </div>
            </div>

            <div>
                <Input
                    type="email"
                    label="Email"
                    placeholder="example@email.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoComplete="email"
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
                <Input
                    label="Phone"
                    placeholder="+234..."
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    autoComplete="tel"
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Message
                </label>
                <textarea
                    rows="5"
                    placeholder="How can we help?"
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    required
                />
                <InputError message={errors.message} className="mt-2" />
            </div>

            {/* Honeypot: hidden from real users, bots fill it in */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={data.website}
                    onChange={(e) => setData("website", e.target.value)}
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={processing}
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
                        Sending...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Message
                    </span>
                )}
            </Button>
        </form>
    );
}
