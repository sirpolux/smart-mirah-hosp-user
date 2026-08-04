import { useEffect, useRef, useState } from "react";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Card from "@/Components/UI/Card";
import { useCart } from "@/Context/CartContext";

const DEBOUNCE_MS = 700;

export default function CartItemRow({ cartItem, removing, onRemove }) {
    const { updateQuantity } = useCart();
    const [draft, setDraft] = useState(String(cartItem.quantity));
    const timerRef = useRef(null);
    const focusedRef = useRef(false);

    // Keep draft in sync if the server-side quantity changes externally
    // (e.g. after a debounced save round-trips a fresh cart payload).
    // Skip while the input is focused so an in-flight response never
    // clobbers what the user is still typing.
    useEffect(() => {
        if (!focusedRef.current) {
            setDraft(String(cartItem.quantity));
        }
    }, [cartItem.quantity]);

    // Clear any pending debounce timer on unmount.
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const parsedDraft = parseInt(draft, 10);

    const saveQuantity = (quantity) => {
        const next = Number.isNaN(quantity) ? 1 : Math.max(1, Math.floor(quantity));
        setDraft(String(next));
        updateQuantity(cartItem.id, next);
    };

    const handleChange = (event) => {
        setDraft(event.target.value);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            const next = parseInt(event.target.value, 10);
            if (!Number.isNaN(next) && next >= 1) {
                saveQuantity(next);
            }
        }, DEBOUNCE_MS);
    };

    const handleBlur = () => {
        focusedRef.current = false;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (Number.isNaN(parsedDraft) || parsedDraft < 1) {
            setDraft(String(cartItem.quantity));
            return;
        }

        if (parsedDraft !== cartItem.quantity) {
            saveQuantity(parsedDraft);
        }
    };

    const handleFocus = () => {
        focusedRef.current = true;
    };

    const handleIncrement = () => {
        saveQuantity((Number.isNaN(parsedDraft) ? cartItem.quantity : parsedDraft) + 1);
    };

    const handleDecrement = () => {
        const current = Number.isNaN(parsedDraft) ? cartItem.quantity : parsedDraft;
        if (current > 1) {
            saveQuantity(current - 1);
        }
    };

    return (
        <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            {/* Image */}
            <div className="h-28 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                {cartItem.item?.image ? (
                    <img
                        src={cartItem.item.image}
                        alt={cartItem.item?.item_name ?? "Product"}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <ShoppingBag size={32} />
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-semibold text-slate-800">
                        {cartItem.item?.item_name ?? "Product"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        ₦{Number(cartItem.unit_price).toLocaleString()} each
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={cartItem.quantity <= 1 && parsedDraft <= 1}
                            className="flex h-10 w-10 items-center justify-center rounded-l-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={draft}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="h-10 w-16 border-x border-slate-200 bg-transparent text-center text-sm font-semibold focus:outline-none focus:ring-0"
                            aria-label={`Quantity of ${cartItem.item?.item_name ?? "item"}`}
                        />
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="flex h-10 w-10 items-center justify-center rounded-r-xl text-slate-600 hover:bg-slate-100"
                            aria-label="Increase quantity"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* Line total */}
                    <span className="w-24 text-right font-bold text-primary-600">
                        ₦{Number(cartItem.total_price).toLocaleString()}
                    </span>

                    {/* Remove */}
                    <button
                        type="button"
                        onClick={onRemove}
                        disabled={removing}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        aria-label={`Remove ${cartItem.item?.item_name ?? "item"} from cart`}
                    >
                        {removing ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Trash2 size={18} />
                        )}
                    </button>
                </div>
            </div>
        </Card>
    );
}
