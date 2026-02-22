"use client";

import { motion } from "framer-motion";
import { BreathingMesh } from "../ui/breathing-mesh";


export function Hero() {
    return (
        <section className="relative h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">
            <BreathingMesh />

            <div className="z-10 w-full max-w-6xl mx-auto space-y-8">
                <div className="overflow-hidden">
                    <motion.img
                        src="/logo.png"
                        alt="MTM Group"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto object-contain object-left"
                    />
                </div>

                <div className="overflow-hidden space-y-4">
                    <motion.h2
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl md:text-5xl text-white uppercase tracking-[0.1em] font-thin"
                    >
                        Join the Team of Instructors
                    </motion.h2>
                    <motion.p
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg md:text-xl text-neutral-400 max-w-xl uppercase tracking-[0.2em] font-light"
                    >
                        We are seeking Fitness Group Instructors. Submit your credentials for review.
                    </motion.p>
                </div>


            </div>

            <div className="absolute bottom-10 left-6 md:left-12 animate-bounce text-white/50">
                ↓ Scroll to Discover
            </div>
        </section>
    );
}
