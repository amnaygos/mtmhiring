"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function StickyCTA() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show after scrolling past the first 800px (approx hero height)
        if (latest > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    const scrollToForm = () => {
        const formElement = document.getElementById("apply");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.9,
                y: isVisible ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-8 right-8 z-[100] ${!isVisible && "pointer-events-none"}`}
        >
            <button
                onClick={scrollToForm}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-2xl flex items-center space-x-3"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                <span className="relative z-10 font-medium uppercase tracking-[0.2em] text-xs">
                    Apply Now
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </motion.div>
    );
}
