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
                    "w-full bg-white rounded-lg py-3 px-4 text-black font-medium transition-all duration-300 ring-1 ring-white/10 focus:outline-none focus:ring-white",
                    className
                )}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-0 transition-all duration-300 pointer-events-none",
                    isActive ? "-top-2 text-xs text-white font-medium" : "top-8 left-4 text-neutral-500"
                )}
            >
                {label}
            </label>
        </div>
    );
}
