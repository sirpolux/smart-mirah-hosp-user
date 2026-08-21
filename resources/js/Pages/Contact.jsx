import GuestLayout from "@/Layouts/GuestLayout";
import SeoHead from "@/Components/Shared/SeoHead";

import Contact from "@/Components/Home/Contact";
import CTA from "@/Components/Home/CTA";

export default function ContactPage({ flash }) {
    return (
        <GuestLayout>
            <SeoHead
                title="Contact Us"
                description="Get in touch with Smart Mirah Hospitality. Request a quote, ask about our hospitality products or speak to our team — we respond fast."
                path="/contact"
            />
            <Contact flash={flash} />
            <CTA />
        </GuestLayout>
    );
}
