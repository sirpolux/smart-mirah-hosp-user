import { Link } from "@inertiajs/react";
import Container from "./Container";
import Logo from "@/Components/Shared/Logo";
import { handleHashHref } from "@/lib/hashNavigation";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">

            <Container>

                <div className="grid gap-12 py-16 lg:grid-cols-4">

                    <div>

                        <Logo />

                        <p className="mt-6 text-slate-300 leading-7">

                            Premium hospitality supplies for hotels,
                            resorts and apartments across Nigeria.

                        </p>

                    </div>

                    <div>

                        <h4 className="font-semibold">

                            Company

                        </h4>

                        <ul className="mt-4 space-y-3 text-slate-300">

                            <li>
                                <a
                                    href="#about"
                                     onClick={(e) => handleHashHref("#about", e)}
                                    className="hover:text-white transition-colors"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <Link href={route("products")} className="hover:text-white transition-colors">
                                    Products
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="#services"
                                    onClick={(e) => handleHashHref("#services", e)}
                                    className="hover:text-white transition-colors"
                                >
                                    Services
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#contact"
                                    onClick={(e) => handleHashHref("#contact", e)}
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h4 className="font-semibold">

                            Contact

                        </h4>

                        <div className="mt-4 space-y-3 text-slate-300">

                            <p>+234 814 323 0391</p>

                            <p>info@smartmirah.com</p>

                            <p>Lagos, Nigeria</p>

                        </div>

                    </div>

                    <div>

                        <h4 className="font-semibold">

                            Newsletter

                        </h4>

                        <p className="mt-4 text-slate-300">

                            Receive updates on new arrivals and promotions.

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">

                    © {new Date().getFullYear()} SmartMirah Hospitality Ltd.
                    All rights reserved.

                </div>

            </Container>

        </footer>
    );
}
