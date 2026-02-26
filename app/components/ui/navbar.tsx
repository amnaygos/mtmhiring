"use client";

import { motion } from "framer-motion";

export function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
        >
            <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center group/logo transition-transform duration-500 hover:scale-110 active:scale-95"
                >
                    <img
                        src="/logo.png"
                        alt="MTM Group"
                        className="h-8 object-contain transition-all duration-500 group-hover/logo:brightness-150"
                    />
                </button>

                {/* Links */}
                <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-12">
                    <button
                        onClick={() => scrollToSection("apply")}
                        className="text-[10px] sm:text-xs font-thin uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => scrollToSection("why-mtm")}
                        className="text-[10px] sm:text-xs font-thin uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        Why MTM
                    </button>
                    <button
                        onClick={() => scrollToSection("role")}
                        className="text-[10px] sm:text-xs font-thin uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        Role
                    </button>
                    <button
                        onClick={() => scrollToSection("relocation")}
                        className="text-[10px] sm:text-xs font-thin uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        Qatar
                    </button>
                </div>

            </div>
        </motion.nav>
    );
}
