import Button from "@/Components/UI/Button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroContent({ slide }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="relative z-20 max-w-2xl"
        >
            <p className="mb-4 uppercase tracking-[4px] text-primary-300 text-sm font-semibold">
                SmartMirah Hospitality
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                {slide.title}
            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-200">
                {slide.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

                <Button size="lg">
                    {slide.primaryButton}
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                    {slide.secondaryButton}

                    <ChevronRight
                        size={18}
                        className="ml-2"
                    />
                </Button>

            </div>
        </motion.div>
    );
}