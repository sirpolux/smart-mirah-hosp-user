import towel from "@/assets/images/categories/towel.jpg";
import toiletries from "@/assets/images/categories/toiletries.jpg";
import slippers from "@/assets/images/categories/slippers.jpg";
import linen from "@/assets/images/categories/linen.jpg";
import branding from "@/assets/images/categories/branding.jpg";
import cleaning from "@/assets/images/categories/cleaning.jpg";

import {
    Bath,
    Bed,
    Shirt,
    Sparkles,
    BrushCleaning,
    Palette,
} from "lucide-react";

export const categories = [
    {
        id: 1,
        name: "Luxury Towels",
        description:
            "Premium cotton towels for hotels and resorts.",
        image: towel,
        icon: Bath,
    },
    {
        id: 2,
        name: "Hotel Linen",
        description:
            "Bed sheets, duvet covers and pillow cases.",
        image: linen,
        icon: Bed,
    },
    {
        id: 3,
        name: "Guest Toiletries",
        description:
            "Soap, shampoo, conditioner and lotion.",
        image: toiletries,
        icon: Sparkles,
    },
    {
        id: 4,
        name: "Hotel Slippers",
        description:
            "Comfortable disposable slippers.",
        image: slippers,
        icon: Shirt,
    },
    {
        id: 5,
        name: "Cleaning Supplies",
        description:
            "Professional cleaning essentials.",
        image: cleaning,
        icon: BrushCleaning,
    },
    {
        id: 6,
        name: "Custom Branding",
        description:
            "Branded guest amenities and packaging.",
        image: branding,
        icon: Palette,
    },
];