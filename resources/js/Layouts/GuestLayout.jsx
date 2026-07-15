import Navbar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";

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
