import { Link } from "@inertiajs/react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import Container from "./Container";
import Logo from "@/Components/Shared/Logo";
import { handleHashHref } from "@/lib/hashNavigation";
import LogoWhite from "@/Components/Shared/LogoWhite";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">

            <Container>

                <div className="grid gap-12 py-16 lg:grid-cols-4">

                    <div>

                        <LogoWhite />

                        <p className="mt-6 text-slate-300 leading-7">

                            Premium hospitality supplies for hotels,
                            resorts and apartments across Nigeria.

                        </p>

                        <div className="mt-6 flex items-center gap-3">

                            <a
                                href="https://www.instagram.com/smartmirahltd/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:bg-white hover:text-slate-900"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="https://www.tiktok.com/@smartmirahltd"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on TikTok"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:bg-white hover:text-slate-900"
                            >
                                <FaTiktok size={18} />
                            </a>

                        </div>

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
