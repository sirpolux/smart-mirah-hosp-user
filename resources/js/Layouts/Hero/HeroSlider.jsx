import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useEffect, useState } from "react";

import { heroSlides } from "@/data/heroSlides";

import HeroSlide from "./HeroSlide";
import HeroIndicators from "./HeroIndicators";

export default function HeroSlider() {

    const [selected, setSelected] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
        },
        [
            Autoplay({
                delay: 5000,
            }),
        ]
    );

    useEffect(() => {

        if (!emblaApi) return;

        const onSelect = () =>
            setSelected(emblaApi.selectedScrollSnap());

        emblaApi.on("select", onSelect);

        onSelect();

    }, [emblaApi]);

    return (
        <section className="overflow-hidden">

            <div
                ref={emblaRef}
                className="overflow-hidden"
            >
                <div className="flex">

                    {heroSlides.map((slide) => (

                        <div
                            key={slide.id}
                            className="min-w-full"
                        >
                            <HeroSlide slide={slide} />
                        </div>

                    ))}

                </div>
            </div>

            <HeroIndicators
                slides={heroSlides}
                selected={selected}
                onSelect={(index) => emblaApi?.scrollTo(index)}
            />

        </section>
    );
}