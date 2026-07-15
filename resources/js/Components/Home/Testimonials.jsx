import Section from "@/Components/Layout/Section";
import Container from "@/Components/Layout/Container";
import SectionTitle from "@/Components/UI/SectionTitle";

import TestimonialSlider from "./TestimonialSlider";

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