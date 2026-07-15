import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function GuestLayout({
    children,
}) {
    return (
        <>
            <Navbar />

            <main>

                {children}

            </main>

            <Footer />
        </>
    );
}