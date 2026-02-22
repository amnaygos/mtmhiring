"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    strength?: number; // How strong the magnetic pull is (higher = stronger pull properly, implies more movement)
}

export function MagneticButton({
    children,
    className,
    onClick,
    disabled = false,
    strength = 0.5,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (disabled) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 };

        // distance from center
        const xOffset = clientX - center.x;
        const yOffset = clientY - center.y;

        x.set(xOffset * strength);
        y.set(yOffset * strength);
    }

    function handleMouseLeave() {
        if (disabled) return;
        x.set(0);
        y.set(0);
    }

    return (
        <motion.button
            ref={ref}
            disabled={disabled}
            className={cn(
                "relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-black font-bold uppercase tracking-wider transition-colors hover:bg-neutral-200",
                disabled && "opacity-50 cursor-not-allowed hover:bg-white",
                className
            )}
            style={{ x: disabled ? 0 : mouseX, y: disabled ? 0 : mouseY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
