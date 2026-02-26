"use client";

export function Footer() {
    return (
        <footer className="py-20 px-6 md:px-12 border-t border-white/5 relative z-10 bg-black overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="space-y-6">
                    <img src="/logo.png" alt="MTM Group" className="h-12 opacity-50 grayscale brightness-200" />
                    <p className="text-neutral-500 font-thin text-sm uppercase tracking-[0.2em] max-w-sm">
                        Building the future of elite fitness in Qatar.
                        Join the most prestigious group of instructors in the region.
                    </p>
                </div>

                <div className="flex flex-col md:items-end gap-8">
                    <div className="flex space-x-8">
                        {["Instagram", "LinkedIn", "Website"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest text-[10px] pb-1 border-b border-white/0 hover:border-white/20"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="text-left md:text-right space-y-2">
                        <p className="text-neutral-500 font-thin text-xs uppercase tracking-widest pt-8">
                            MTM Group, Qatar.
                        </p>
                        <p className="text-neutral-700 font-thin text-[10px] uppercase tracking-widest">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </footer>
    );
}
