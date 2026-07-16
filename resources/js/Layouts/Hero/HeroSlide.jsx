import HeroOverlay from "./HeroOverlay";
import HeroContent from "./HeroContent";
import Container from "../Container";

export default function HeroSlide({
    slide,
}) {
    return (
        <div className="relative h-screen">

            <img
                src={slide.image}
                className="absolute inset-0 h-full w-full object-cover"
                alt={slide.title}
            />

            <HeroOverlay />

            <Container className="relative z-10 flex h-full items-center">

                <HeroContent slide={slide} />

            </Container>

        </div>
    );
}