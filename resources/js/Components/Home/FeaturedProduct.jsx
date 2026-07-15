import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import SectionTitle from "@/Components/UI/SectionTitle";
import Button from "@/Components/UI/Button";

import ProductGrid from "../../Layouts/Product/ProductGrid";

import { products } from "@/data/products";

export default function FeaturedProducts() {
    const featuredProducts = products.filter(
        product => product.featured
    );

    return (
        <Section>

            <Container>

                <SectionTitle
                    badge="Featured Products"
                    title="Premium Hospitality Essentials"
                    description="Browse some of our most requested hospitality products trusted by hotels across Nigeria."
                />

                <ProductGrid products={featuredProducts} />

                <div className="mt-16 flex justify-center">

                    <Button size="lg">
                        View All Products
                    </Button>

                </div>

            </Container>

        </Section>
    );
}
