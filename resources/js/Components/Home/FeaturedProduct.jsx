import { Link } from "@inertiajs/react";
import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import SectionTitle from "@/Components/UI/SectionTitle";
import Button from "@/Components/UI/Button";

import ProductGrid from "../../Layouts/Product/ProductGrid";

export default function FeaturedProducts({ items = [] }) {
    console.log("Featured Products Items:", items); // Debugging line to check the items prop
    return (
        <Section>

            <Container>

                <SectionTitle
                    badge="Featured Products"
                    title="Premium Hospitality Essentials"
                    description="Browse some of our most requested hospitality products trusted by hotels across Nigeria."
                />

                <ProductGrid products={items.data} />

                <div className="mt-16 flex justify-center">

                    <Link href={route("products")}>
                        <Button size="lg">
                            View All Products
                        </Button>
                    </Link>

                </div>

            </Container>

        </Section>
    );
}
