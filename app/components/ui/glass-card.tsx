"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    spotlight?: boolean;
}

export function GlassCard({ children, className, spotlight = true }: GlassCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative overflow-hidden bg-white/5 backdrop-blur-[2px] border border-white/20 p-8",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            {spotlight && (
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 80%
              )
            `,
                    }}
                />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
