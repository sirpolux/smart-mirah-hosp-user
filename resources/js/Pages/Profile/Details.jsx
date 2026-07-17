import { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Phone,
    Building2,
    Briefcase,
    MapPin,
    Building,
    Globe,
    Tag,
    Pencil,
    Save,
    X,
    User,
    Mail,
    LogOut,
    Package,
    ShoppingCart,
    ChevronRight,
} from "lucide-react";
import { Link } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";
import AuthInput from "@/Components/Auth/AuthInput";

const BUSINESS_TYPES = [
    { label: "Select business type", value: "" },
    { label: "Hotel", value: "hotel" },
    { label: "Resort", value: "resort" },
    { label: "Serviced Apartment", value: "apartment" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Guest House", value: "guest_house" },
    { label: "Other", value: "other" },
];

export default function Details({ detail }) {
    const user = usePage().props.auth.user;
    const hasDetails =
        detail &&
        Object.values(detail).some(
            (v) => v !== null && v !== false && v !== "",
        );
    const [isEditing, setIsEditing] = useState(!hasDetails);

    const { data, setData, patch, processing, errors } = useForm({
        phone: detail?.phone ?? "",
        company_name: detail?.company_name ?? "",
        company_role: detail?.company_role ?? "",
        address: detail?.address ?? "",
        city: detail?.city ?? "",
        state: detail?.state ?? "",
        business_type: detail?.business_type ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.details.update"), {
            onSuccess: () => setIsEditing(false),
        });
    };

    const cancelEdit = () => {
        if (hasDetails) {
            setIsEditing(false);
        }
    };

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <GuestLayout>
            <Head title="My Profile" />

            {/* ===== Section 1: Profile Hero ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 pb-32 pt-16 lg:pt-24">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute right-1/4 top-10 h-40 w-40 rounded-full bg-white/5" />

                <Container>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-4xl font-bold text-white shadow-2xl backdrop-blur-sm">
                            {initials}
                        </div>

                        {/* Name & Email */}
                        <h1 className="mt-6 text-3xl font-bold text-white lg:text-4xl">
                            {user.name}
                        </h1>
                        <p className="mt-2 flex items-center gap-2 text-blue-100">
                            <Mail size={16} />
                            {user.email}
                        </p>

                        {/* Badge */}
                        {hasDetails && (
                            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-green-300" />
                                Profile Complete
                            </span>
                        )}
                        {!hasDetails && (
                            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-400/30 px-4 py-1.5 text-sm font-medium text-amber-100 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-amber-300" />
                                Profile Incomplete
                            </span>
                        )}
                    </div>
                </Container>
            </section>

            {/* ===== Section 2: Content ===== */}
            <section className="-mt-24 pb-20">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Left Column — Quick Links */}
                        <div className="lg:col-span-1">
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                <div className="border-b border-slate-100 px-6 py-5">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                        Quick Links
                                    </h3>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    <Link
                                        href={route("home")}
                                        className="flex items-center justify-between px-6 py-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary-600"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Package size={18} className="text-slate-400" />
                                            Products
                                        </span>
                                        <ChevronRight size={16} className="text-slate-300" />
                                    </Link>

                                    <Link
                                        href={route("home")}
                                        className="flex items-center justify-between px-6 py-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary-600"
                                    >
                                        <span className="flex items-center gap-3">
                                            <ShoppingCart size={18} className="text-slate-400" />
                                            My Orders
                                        </span>
                                        <ChevronRight size={16} className="text-slate-300" />
                                    </Link>

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <span className="flex items-center gap-3">
                                            <LogOut size={18} />
                                            Sign Out
                                        </span>
                                        <ChevronRight size={16} className="text-red-300" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column — Profile Details Card */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                {/* Card Header */}
                                <div className="border-b border-slate-100 px-8 py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">
                                                {hasDetails
                                                    ? "Profile Details"
                                                    : "Complete Your Profile"}
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {hasDetails
                                                    ? "Your business information"
                                                    : "Tell us about yourself to get started."}
                                            </p>
                                        </div>

                                        {hasDetails && !isEditing && (
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <Pencil size={16} className="mr-2" />
                                                Edit
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="px-8 py-8">
                                    {!isEditing ? (
                                        /* ---- DISPLAY MODE ---- */
                                        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                                            <DetailField
                                                icon={Phone}
                                                label="Phone"
                                                value={detail?.phone}
                                            />
                                            <DetailField
                                                icon={Building2}
                                                label="Company"
                                                value={detail?.company_name}
                                            />
                                            <DetailField
                                                icon={Briefcase}
                                                label="Role"
                                                value={detail?.company_role}
                                            />
                                            <DetailField
                                                icon={Tag}
                                                label="Business Type"
                                                value={
                                                    BUSINESS_TYPES.find(
                                                        (t) =>
                                                            t.value ===
                                                            detail?.business_type,
                                                    )?.label ??
                                                    detail?.business_type
                                                }
                                            />
                                            <DetailField
                                                icon={MapPin}
                                                label="Address"
                                                value={detail?.address}
                                                fullWidth
                                            />
                                            <DetailField
                                                icon={Building}
                                                label="City"
                                                value={detail?.city}
                                            />
                                            <DetailField
                                                icon={Globe}
                                                label="State"
                                                value={detail?.state}
                                            />
                                        </div>
                                    ) : (
                                        /* ---- EDIT / CREATE MODE ---- */
                                        <form
                                            onSubmit={submit}
                                            className="space-y-6"
                                        >
                                            <AuthInput
                                                id="phone"
                                                label="Phone Number"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                error={errors.phone}
                                                icon={Phone}
                                                placeholder="+234 800 000 0000"
                                            />

                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <AuthInput
                                                    id="company_name"
                                                    label="Company Name"
                                                    value={data.company_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    error={
                                                        errors.company_name
                                                    }
                                                    icon={Building2}
                                                    placeholder="SmartMirah Hospitality"
                                                />

                                                <AuthInput
                                                    id="company_role"
                                                    label="Your Role"
                                                    value={data.company_role}
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_role",
                                                            e.target.value,
                                                        )
                                                    }
                                                    error={
                                                        errors.company_role
                                                    }
                                                    icon={Briefcase}
                                                    placeholder="Procurement Manager"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Business Type
                                                </label>
                                                <div className="relative">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                        <Tag
                                                            size={18}
                                                            className="text-slate-400"
                                                        />
                                                    </div>
                                                    <select
                                                        value={
                                                            data.business_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "business_type",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="block w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                                    >
                                                        {BUSINESS_TYPES.map(
                                                            (t) => (
                                                                <option
                                                                    key={
                                                                        t.value
                                                                    }
                                                                    value={
                                                                        t.value
                                                                    }
                                                                >
                                                                    {t.label}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                {errors.business_type && (
                                                    <p className="text-sm text-red-600">
                                                        {errors.business_type}
                                                    </p>
                                                )}
                                            </div>

                                            <AuthInput
                                                id="address"
                                                label="Business Address"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value,
                                                    )
                                                }
                                                error={errors.address}
                                                icon={MapPin}
                                                placeholder="123 Hospitality Avenue"
                                            />

                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <AuthInput
                                                    id="city"
                                                    label="City"
                                                    value={data.city}
                                                    onChange={(e) =>
                                                        setData(
                                                            "city",
                                                            e.target.value,
                                                        )
                                                    }
                                                    error={errors.city}
                                                    icon={Building}
                                                    placeholder="Lagos"
                                                />

                                                <AuthInput
                                                    id="state"
                                                    label="State"
                                                    value={data.state}
                                                    onChange={(e) =>
                                                        setData(
                                                            "state",
                                                            e.target.value,
                                                        )
                                                    }
                                                    error={errors.state}
                                                    icon={Globe}
                                                    placeholder="Lagos"
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                                                {hasDetails && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        onClick={cancelEdit}
                                                    >
                                                        <X
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                        Cancel
                                                    </Button>
                                                )}

                                                <Button
                                                    type="submit"
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
                                                            Saving...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            <Save size={18} />
                                                            {hasDetails
                                                                ? "Update Profile"
                                                                : "Save Profile"}
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </GuestLayout>
    );
}

/* Helper for displaying a detail field */
function DetailField({ icon: Icon, label, value, fullWidth = false }) {
    if (!value) return null;

    return (
        <div className={fullWidth ? "sm:col-span-2" : ""}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {label}
            </p>
            <p className="flex items-center gap-2.5 text-sm text-slate-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon size={16} />
                </span>
                {value}
            </p>
        </div>
    );
}
