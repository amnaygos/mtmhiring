"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface VelocityTextProps {
    children: React.ReactNode;
    className?: string;
    baseVelocity?: number;
}

export function VelocityText({ children, className, baseVelocity = 5 }: VelocityTextProps) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const skewX = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    return (
        <motion.div
            className={className}
            style={{ skewX }}
        >
            {children}
        </motion.div>
    );
}
