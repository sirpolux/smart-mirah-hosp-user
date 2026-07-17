import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import InputError from "@/Components/InputError";

const AuthInput = forwardRef(function AuthInput(
    {
        id,
        label,
        type = "text",
        value,
        onChange,
        error,
        icon: Icon,
        placeholder,
        autoComplete,
        isFocused = false,
        required = false,
        disabled = false,
        className = "",
        ...props
    },
    ref,
) {
    const localRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className={cn("space-y-1.5", className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <Icon
                            size={18}
                            className="text-slate-400"
                        />
                    </div>
                )}

                <input
                    ref={localRef}
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    disabled={disabled}
                    className={cn(
                        "block w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
                        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
                        Icon && "pl-11",
                        isPassword && "pr-11",
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-200 hover:border-slate-300",
                    )}
                    {...props}
                />

                {isPassword && value && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            <InputError message={error} />
        </div>
    );
});

export default AuthInput;
