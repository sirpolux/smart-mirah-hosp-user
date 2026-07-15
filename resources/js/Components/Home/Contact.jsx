import Section from "@/Components/Layout/Section";
import Container from "@/Components/Layout/Container";
import SectionTitle from "@/Components/UI/SectionTitle";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <Section id="contact">

            <Container>

                <SectionTitle
                    badge="Contact Us"
                    title="Let's Start Your Next Hospitality Project"
                    description="Need a bulk quote or custom-branded hospitality products? Send us a message."
                />

                <div className="grid gap-16 lg:grid-cols-2">

                    <ContactInfo />

                    <ContactForm />

                </div>

            </Container>

        </Section>
    );
}