import Container from "@/Components/Layout/Container";
import HeroSlider from "../../Layouts/Hero/HeroSlider";

export default function Hero() {
    return (
        <section className="relative">

            <Container className="absolute inset-0 z-20 flex items-center">
                {/* Content is rendered by HeroSlide */}
            </Container>

            <HeroSlider />

        </section>
    );
}