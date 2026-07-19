import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { cart: sharedCart } = usePage().props;
    const [cart, setCart] = useState(sharedCart ?? null);
    const [loading, setLoading] = useState(false);

    const itemCount = cart?.total_quantity ?? 0;

    useEffect(() => {
        setCart(sharedCart ?? null);
    }, [sharedCart]);

    const addToCart = useCallback((itemId, quantity = 1) => {
        setLoading(true);
        router.post(route("cart.items.store"), { item_id: itemId, quantity }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });
    }, []);

    const updateQuantity = useCallback((cartItemId, quantity) => {
        router.patch(route("cart.items.update", cartItemId), { quantity }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    const removeItem = useCallback((cartItemId) => {
        router.delete(route("cart.items.destroy", cartItemId), {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            itemCount,
            addToCart,
            updateQuantity,
            removeItem,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
