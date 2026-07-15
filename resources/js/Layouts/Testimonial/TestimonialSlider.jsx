import useEmblaCarousel from "embla-carousel-react";

import TestimonialCard from "@/Components/Cards/TestimonialCard";

export default function TestimonialSlider({
    testimonials,
}) {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: "start",
    });

    return (
        <div
            ref={emblaRef}
            className="overflow-hidden"
        >
            <div className="flex">

                {testimonials.map(testimonial => (

                    <div
                        key={testimonial.id}
                        className="min-w-full px-4 md:min-w-[50%] xl:min-w-[33.333%]"
                    >
                        <TestimonialCard
                            {...testimonial}
                        />
                    </div>

                ))}

            </div>
        </div>
    );
}