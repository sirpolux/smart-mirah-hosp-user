import GuestLayout from "@/Layouts/GuestLayout";
import SeoHead from "@/Components/Shared/SeoHead";

import Process from "@/Components/Home/Process";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import Testimonials from "@/Components/Home/Testimonials";
import CTA from "@/Components/Home/CTA";

export default function ServicesPage() {
    return (
        <GuestLayout>
            <SeoHead
                title="Our Services"
                description="From enquiry to nationwide delivery, Smart Mirah Hospitality makes sourcing hotel supplies seamless — bulk ordering, custom branding and dependable logistics across Nigeria."
                path="/services"
            />
            <Process />
            <WhyChooseUs />
            <Testimonials />
            <CTA />
        </GuestLayout>
    );
}
