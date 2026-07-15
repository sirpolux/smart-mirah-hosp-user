import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import SectionTitle from "@/Components/UI/SectionTitle";

import ProcessCard from "@/Components/Cards/ProcessCard";

import { processSteps } from "@/data/processSteps";

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
