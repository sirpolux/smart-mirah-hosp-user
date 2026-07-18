import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import SectionTitle from "@/Components/UI/SectionTitle";
import ProductGrid from "@/Layouts/Product/ProductGrid";
import Button from "@/Components/UI/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Products({ items }) {
    const products = items?.data ?? [];
    const pagination = items?.meta ?? null;

    return (
        <GuestLayout>
            <Section>
                <Container>

                    <SectionTitle
                        badge="Our Products"
                        title="Premium Hospitality Essentials"
                        description="Browse our complete range of hospitality products trusted by hotels across Nigeria."
                    />

                    {products.length > 0 ? (
                        <>
                            <ProductGrid products={products} />

                            {pagination && pagination.last_page > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-2">
                                    {pagination.links?.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 opacity-40"
                                                >
                                                    {link.label === "&laquo; Previous" ? (
                                                        <ChevronLeft size={18} />
                                                    ) : link.label === "&raquo; Next" ? (
                                                        <ChevronRight size={18} />
                                                    ) : (
                                                        link.label
                                                    )}
                                                </span>
                                            );
                                        }

                                        if (link.label === "&laquo; Previous") {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary-600 hover:text-primary-600"
                                                >
                                                    <ChevronLeft size={18} />
                                                </Link>
                                            );
                                        }

                                        if (link.label === "&raquo; Next") {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary-600 hover:text-primary-600"
                                                >
                                                    <ChevronRight size={18} />
                                                </Link>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
                                                    link.active
                                                        ? "border-primary-600 bg-primary-600 text-white"
                                                        : "border-slate-200 text-slate-600 hover:border-primary-600 hover:text-primary-600"
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg text-slate-500">
                                No products available at the moment.
                            </p>
                            <Link href={route("home")} className="mt-6">
                                <Button variant="outline">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    )}

                </Container>
            </Section>
        </GuestLayout>
    );
}
