import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { cart: sharedCart } = usePage().props;
    // Inertia serializes JsonResources as { data: {...} }; unwrap so consumers
    // read cart.items / cart.total_quantity directly.
    const unwrap = (value) => (value?.data ?? value);

    const [cart, setCart] = useState(() => unwrap(sharedCart));
    const [addingItemIds, setAddingItemIds] = useState({});

    const itemCount = cart?.total_quantity ?? 0;

    // Derived: true while any item is being added. Kept for consumers that
    // only need a coarse "busy" flag (spinner, checkout button).
    const loading = Object.keys(addingItemIds).length > 0;

    useEffect(() => {
        setCart(unwrap(sharedCart));
    }, [sharedCart]);

    const isAddingItem = useCallback(
        (itemId) => Boolean(addingItemIds[itemId]),
        [addingItemIds]
    );

    const addToCart = useCallback((itemId, quantity = 1) => {
        setAddingItemIds((prev) => ({ ...prev, [itemId]: true }));
        router.post(route("cart.items.store"), { item_id: itemId, quantity }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setAddingItemIds((prev) => {
                    const next = { ...prev };
                    delete next[itemId];
                    return next;
                });
            },
            onError: () => {
                setAddingItemIds((prev) => {
                    const next = { ...prev };
                    delete next[itemId];
                    return next;
                });
            },
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

    const clearCart = useCallback(() => {
        setCart(null);
        setAddingItemIds({});
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            itemCount,
            addToCart,
            isAddingItem,
            updateQuantity,
            removeItem,
            clearCart,
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
