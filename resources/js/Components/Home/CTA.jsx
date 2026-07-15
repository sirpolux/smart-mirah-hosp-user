import Section from "@/Layouts/Section";
import Container from "@/Layouts/Container";
import Button from "@/Components/UI/Button";

export default function CTA() {
    return (
        <Section className="bg-primary-600">

            <Container>

                <div className="rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 px-8 py-20 text-center text-white">

                    <h2 className="text-4xl font-bold lg:text-5xl">
                        Ready to Elevate Your Guest Experience?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                        Let's help you source premium hospitality products,
                        custom-branded amenities, and hotel essentials at
                        competitive wholesale prices.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">

                        <Button
                            variant="secondary"
                            size="lg"
                        >
                            Request Quote
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-primary-600"
                        >
                            Contact Sales
                        </Button>

                    </div>

                </div>

            </Container>

        </Section>
    );
}
