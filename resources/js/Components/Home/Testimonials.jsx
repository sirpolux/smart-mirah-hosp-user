import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import SectionTitle from "@/Components/UI/SectionTitle";

import TestimonialSlider from "@/Layouts/Testimonial/TestimonialSlider";

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    return (
        <Section>

            <Container>

                <SectionTitle
                    badge="Testimonials"
                    title="Trusted By Hospitality Businesses"
                    description="Hear what our clients say about working with SmartMirah."
                />

                <TestimonialSlider
                    testimonials={testimonials}
                />

            </Container>

        </Section>
    );
}
