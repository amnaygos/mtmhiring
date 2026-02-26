"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

export function Relocation() {
    return (
        <section id="relocation" className="py-32 px-6 md:px-12 relative z-10 bg-black">
            <div className="max-w-6xl mx-auto w-full space-y-32">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6 text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-[0.1em]">
                        Your Journey to Qatar
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide max-w-2xl">
                        A global career requires a seamless transition. We handle the logistics so you can focus entirely on the floor.
                        Your flights, visa, and complete relocation to Doha are fully sponsored and coordinated by MTM Group.
                        <br /><br />
                        You bring the talent; we bring you here.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <GlassCard className="flex flex-col items-start p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-none border border-white/20 h-full">
                            <h4 className="text-2xl font-light uppercase tracking-widest mb-3 text-white">
                                Visa
                            </h4>
                            <p className="text-neutral-400 font-thin text-base leading-relaxed tracking-wide">
                                Complete legal and administrative sponsorship. We secure your residency permits and work visas swiftly.
                            </p>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <GlassCard className="flex flex-col items-start p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-none border border-white/20 h-full">
                            <h4 className="text-2xl font-light uppercase tracking-widest mb-3 text-white">
                                Flight
                            </h4>
                            <p className="text-neutral-400 font-thin text-base leading-relaxed tracking-wide">
                                Your journey is on us. We cover your one-way flight from your home country directly to Doha International Airport.
                            </p>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <GlassCard className="flex flex-col items-start p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-none border border-white/20 h-full">
                            <h4 className="text-2xl font-light uppercase tracking-widest mb-3 text-white">
                                Transition
                            </h4>
                            <p className="text-neutral-400 font-thin text-base leading-relaxed tracking-wide">
                                Dedicated on-ground support upon arrival to ensure your transition into a new country is smooth and welcoming.
                            </p>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <GlassCard className="flex flex-col items-start p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-none border border-white/20 h-full">
                            <h4 className="text-2xl font-light uppercase tracking-widest mb-3 text-white">
                                High Earning
                            </h4>
                            <p className="text-neutral-400 font-thin text-base leading-relaxed tracking-wide">
                                Maximize your potential with a highly competitive, tax-free salary structural package unique to the Qatar market.
                            </p>
                        </GlassCard>
                    </motion.div>

                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[21/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group"
                >
                    <img
                        src="/images/female-fitness-class.png"
                        alt="MTM Fitness Class"
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start">
                        <p className="text-white text-2xl md:text-3xl font-thin uppercase tracking-[0.2em]">
                            Excellence in every move
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
