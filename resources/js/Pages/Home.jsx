import GuestLayout from "@/Layouts/GuestLayout";

import Hero from "@/Components/Home/Hero";
import Clients from "@/Components/Home/Clients";
import About from "@/Components/Home/About";
import Categories from "@/Components/Home/Categories";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import FeaturedProducts from "@/Components/Home/FeaturedProducts";
import Process from "@/Components/Home/Process";
import Testimonials from "@/Components/Home/Testimonials";
import CTA from "@/Components/Home/CTA";
import Contact from "@/Components/Home/Contact";

export default function Home() {
    return (
        <GuestLayout>
            <Hero />
            <Clients />
            <About />
            <Categories />
            <WhyChooseUs />
            <FeaturedProducts />
            <Process />
            <Testimonials />
            <CTA />
            <Contact />
        </GuestLayout>
    );
}