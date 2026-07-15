import Container from "@/Components/Layout/Container";
import Section from "@/Components/Layout/Section";
import SectionTitle from "@/Components/UI/SectionTitle";
import FeatureCard from "@/Components/Cards/FeatureCard";

import { features } from "@/data/features";

export default function WhyChooseUs() {
    return (
        <Section className="bg-slate-50">

            <Container>

                <SectionTitle
                    badge="Why Choose Us"
                    title="The SmartMirah Advantage"
                    description="We combine premium products, dependable logistics and outstanding service to help your hospitality business exceed guest expectations."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {features.map(feature => (
                        <FeatureCard
                            key={feature.id}
                            {...feature}
                        />
                    ))}

                </div>

            </Container>

        </Section>
    );
}