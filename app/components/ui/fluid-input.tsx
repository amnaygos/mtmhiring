"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface FluidInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function FluidInput({ label, id, className, ...props }: FluidInputProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    const isActive = focused || value.length > 0;

    return (
        <div className="relative pt-6">
            <input
                id={id}
                {...props}
                className={cn(
                    "w-full bg-transparent border-b border-neutral-800 py-2 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors duration-300",
                    className
                )}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-0 top-2 text-neutral-500 transition-all duration-300 pointer-events-none",
                    isActive ? "-top-2 text-xs text-white font-medium" : "top-8 text-neutral-500"
                )}
            >
                {label}
            </label>
        </div>
    );
}
