import { useState } from "react";
import { Phone, Menu, ShoppingCart, User } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import Container from "./Container";
import Logo from "@/Components/Shared/Logo";
import NavLink from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Button from "@/Components/UI/Button";

import { navigation } from "@/data/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const user = usePage().props.auth?.user ?? null;

    return (
        <>
            <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">

                <Container>

                    <div className="flex h-20 items-center justify-between">

                        <Logo />

                        <nav className="hidden items-center gap-8 lg:flex">

                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                        </nav>

                        <div className="hidden items-center gap-4 lg:flex">

                            <a
                                href="tel:+2348143230391"
                                className="flex items-center gap-2 text-sm"
                            >
                                <Phone size={16} />

                                Call Us
                            </a>

                            {user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
                                >
                                    <User size={18} />
                                    {user.name}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
                                    >
                                        Sign In
                                    </Link>

                                    <Link href={route("register")}>
                                        <Button size="sm">
                                            Create Account
                                        </Button>
                                    </Link>
                                </>
                            )}

                            <Button size="sm" variant="outline">
                                Request Quote
                            </Button>

                            <ShoppingCart
                                size={22}
                                className="cursor-pointer"
                            />

                        </div>

                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu />
                        </button>

                    </div>

                </Container>

            </header>

            <MobileMenu
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
