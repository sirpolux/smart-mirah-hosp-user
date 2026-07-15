import Section from "@/Components/Layout/Section";
import Container from "@/Components/Layout/Container";
import SectionTitle from "@/Components/UI/SectionTitle";

import ProcessCard from "@/Components/Cards/ProcessCard";

import { processSteps } from "@/data/process";

export default function Process() {
    return (
        <Section className="bg-slate-50">

            <Container>

                <SectionTitle
                    badge="Our Process"
                    title="Simple, Fast & Reliable"
                    description="From enquiry to delivery, we make sourcing hospitality supplies seamless."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {processSteps.map((step, index) => (
                        <ProcessCard
                            key={step.id}
                            number={`0${index + 1}`}
                            {...step}
                        />
                    ))}

                </div>

            </Container>

        </Section>
    );
}