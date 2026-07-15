import Container from "@/Components/Layout/Container";
import Section from "@/Components/Layout/Section";
import SectionTitle from "@/Components/UI/SectionTitle";
import ClientLogo from "@/Components/Cards/ClientLogo";
import { clients } from "@/data/clients";

export default function Clients() {
    return (
        <Section className="bg-white">
            <Container>

                <SectionTitle
                    badge="Trusted By"
                    title="Hotels Across Nigeria Trust SmartMirah"
                    description="We proudly supply premium hospitality products to hotels, apartments, resorts and guest houses."
                />

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {clients.map(client => (
                        <ClientLogo
                            key={client.id}
                            {...client}
                        />
                    ))}

                </div>

            </Container>
        </Section>
    );
}