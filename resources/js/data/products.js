import towel from "@/assets/images/products/towel.jpg";
import linen from "@/assets/images/products/linen.jpg";
import toiletries from "@/assets/images/products/toiletries.jpg";
import slipper from "@/assets/images/products/slipper.jpg";

export const products = [
    {
        id: 1,
        name: "Luxury Hotel Towels",
        category: "Towels",
        price: 8500,
        image: towel,
        featured: true,
    },
    {
        id: 2,
        name: "Premium Bed Linen",
        category: "Linen",
        price: 18000,
        image: linen,
        featured: true,
    },
    {
        id: 3,
        name: "Guest Toiletry Kit",
        category: "Amenities",
        price: 4200,
        image: toiletries,
        featured: true,
    },
    {
        id: 4,
        name: "Disposable Hotel Slippers",
        category: "Slippers",
        price: 2500,
        image: slipper,
        featured: true,
    },
];