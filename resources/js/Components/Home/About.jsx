import Container from "@/Layouts/Container";
import Section from "@/Layouts/Section";
import Button from "@/Components/UI/Button";
import SectionTitle from "@/Components/UI/SectionTitle";
import StatCard from "@/Layouts/StatsCard";
import { stats } from "@/data/stats";

import aboutImage from "@/assets/images/about/about.svg";

export default function About() {
    return (
        <Section id="about" className="bg-slate-50">

            <Container>

                <div className="grid items-center gap-20 lg:grid-cols-2">

                    <div>

                        <img
                            src={aboutImage}
                            alt="About SmartMirah"
                            className="rounded-3xl shadow-xl"
                        />

                    </div>

                    <div>

                        <SectionTitle
                            align="left"
                            badge="About Us"
                            title="Elevating Hospitality Standards Across Nigeria"
                            description="SmartMirah Hospitality supplies premium guest amenities, hotel kits, luxury linens and branded hospitality products designed to help hotels create exceptional guest experiences."
                        />

                        <div className="mt-8 space-y-5">

                            <p className="leading-8 text-slate-600">
                                We partner with hotels, serviced apartments, guest houses and resorts to provide high-quality hospitality supplies backed by dependable nationwide delivery and exceptional customer service.
                            </p>

                        </div>

                        <Button className="mt-10">
                            Learn More
                        </Button>

                    </div>

                </div>

                <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {stats.map(stat => (
                        <StatCard
                            key={stat.id}
                            {...stat}
                        />
                    ))}

                </div>

            </Container>

        </Section>
    );
}
