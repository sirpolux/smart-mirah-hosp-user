import Container from "@/Layouts/Container";
import Section from "@/Layouts/Section";
import SectionTitle from "@/Components/UI/SectionTitle";

import CategoryCard from "@/Components/Cards/CategoryCards";

import { categories } from "@/data/categories";

export default function Categories() {
    return (
        <Section>

            <Container>

                <SectionTitle
                    badge="Products"
                    title="Everything Your Hotel Needs"
                    description="Explore our premium hospitality products carefully selected for hotels, apartments, resorts and guest houses."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            {...category}
                        />
                    ))}

                </div>

            </Container>

        </Section>
    );
}
