"use client";

import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { VelocityText } from "../ui/velocity-text";

const features = [
    {
        title: "Dynamic Environment",
        description: "A high-energy environment that celebrates pure strength and intensity.",
    },
    {
        title: "Career Growth",
        description: "Advance your career within the prestigious MTM Group portfolio.",
    },
    {
        title: "Dynamic Impact",
        description: "Directly influence the health and wellness of our members across Qatar.",
    },
];

export function WhyMTM() {
    return (
        <section id="why-mtm" className="py-32 px-6 md:px-12 relative z-10 bg-black">
            <div className="max-w-6xl mx-auto w-full">
                <VelocityText className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl font-thin uppercase tracking-[0.1em] inline-block"
                    >
                        Why MTM Group?
                    </motion.h2>
                </VelocityText>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            >
                                <GlassCard className="flex items-start space-x-6 bg-white/5 hover:bg-white/10 transition-colors text-left p-8 rounded-none border border-white/20">
                                    <div>
                                        <h3 className="text-2xl font-light uppercase tracking-widest mb-3">{feature.title}</h3>
                                        <p className="text-neutral-400 leading-relaxed text-base font-thin tracking-wide">
                                            {feature.description}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
