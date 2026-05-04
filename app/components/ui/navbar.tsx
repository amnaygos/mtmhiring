"use client";

import { motion } from "framer-motion";

export function Navbar() {

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


            </div>
        </motion.nav>
    );
}
