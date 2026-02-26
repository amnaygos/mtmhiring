"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

const starQualities = [
    {
        title: "Proven Experience",
        description: "A track record of leading engaging and effective group classes.",
    },
    {
        title: "Unstoppable Energy",
        description: "The ability to command a room and motivate every member.",
    },
    {
        title: "People Skills",
        description: "A genuine passion for building connections and fostering a welcoming atmosphere.",
    },
    {
        title: "Professionalism",
        description: "A commitment to punctuality, safety, and brand excellence.",
    }
];

const roleResponsibilities = [
    "Deliver high-octane, inspiring group fitness sessions.",
    "Create a safe, inclusive, and fun environment for all fitness levels.",
    "Be an ambassador for the MTM Group mission of wellness and excellence."
];

export function RoleDetails() {
    return (
        <section id="role" className="py-32 px-6 md:px-12 relative z-10 bg-black">
            <div className="max-w-6xl mx-auto w-full space-y-32">

                {/* Qualifications */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6 text-left"
                    >
                        <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-[0.1em]">
                            Are You Our Next Star?
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide max-w-2xl">
                            We want instructors who bring more than just a workout—we want a vibe.
                            You are the perfect fit if you have:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {starQualities.map((quality, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                >
                                    <GlassCard className="flex flex-col items-start p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-none border border-white/20 h-full">
                                        <div>
                                            <h4 className="text-2xl font-light uppercase tracking-widest mb-3 text-white">
                                                {quality.title}
                                            </h4>
                                            <p className="text-neutral-400 text-base leading-relaxed font-thin tracking-wide">
                                                {quality.description}
                                            </p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group"
                        >
                            <img
                                src="/images/fitness-instructor.png"
                                alt="MTM Instructor"
                                className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </motion.div>
                    </div>
                </div>

                {/* Role */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-12"
                >
                    <div className="text-left mb-12">
                        <h3 className="text-4xl md:text-6xl font-thin uppercase tracking-[0.1em] text-white">
                            Your Role
                        </h3>
                    </div>

                    <ul className="space-y-8 max-w-4xl">
                        {roleResponsibilities.map((item, i) => (
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                key={i}
                                className="flex items-start space-x-6 pb-6 border-b border-white/5"
                            >
                                <span className="text-white/40 font-thin text-xl">—</span>
                                <span className="text-neutral-400 font-thin text-lg md:text-xl leading-relaxed tracking-wide">
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
