"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface FluidSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { label: string; value: string }[];
}

export function FluidSelect({ label, id, className, options, ...props }: FluidSelectProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        setFocused(false);
        if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    const isActive = focused || value.length > 0;

    return (
        <div className="relative pt-6">
            <select
                id={id}
                {...props}
                className={cn(
                    "w-full bg-white rounded-lg py-3 px-4 text-black font-medium outline-none transition-all duration-300 ring-1 ring-white/10 focus:ring-white appearance-none cursor-pointer",
                    !isActive && "text-transparent",
                    className
                )}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
                onChange={handleChange}
            >
                <option value="" disabled className="text-black bg-white"></option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-black bg-white">
                        {opt.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-0 transition-all duration-300 pointer-events-none",
                    isActive ? "-top-2 text-xs text-white font-medium" : "top-8 left-4 text-neutral-500"
                )}
            >
                {label}
            </label>
            {/* Custom dropdown arrow */}
            <div className="absolute right-4 top-9 pointer-events-none">
                <svg
                    className={cn("w-4 h-4 transition-transform duration-300 text-neutral-400", focused && "rotate-180 text-black")}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
}
