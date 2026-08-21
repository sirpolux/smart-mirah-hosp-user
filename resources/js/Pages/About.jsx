import GuestLayout from "@/Layouts/GuestLayout";
import SeoHead from "@/Components/Shared/SeoHead";

import About from "@/Components/Home/About";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import Clients from "@/Components/Home/Clients";
import CTA from "@/Components/Home/CTA";

export default function AboutPage() {
    return (
        <GuestLayout>
            <SeoHead
                title="About Us"
                description="Learn about Smart Mirah Hospitality — a trusted supplier of premium guest amenities, hotel kits, luxury linens and branded hospitality products for hotels across Nigeria."
                path="/about"
            />
            <About />
            <WhyChooseUs />
            <Clients />
            <CTA />
        </GuestLayout>
    );
}
