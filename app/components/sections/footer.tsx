"use client";

export function Footer() {
    return (
        <footer className="py-12 px-6 md:px-12 border-t border-white/10 relative z-10 bg-black">
            <div className="max-w-6xl mx-auto flex flex-col items-start gap-2">
                <p className="text-neutral-500 font-thin text-xs uppercase tracking-widest">
                    MTM Group, Qatar.
                </p>
                <p className="text-neutral-600 font-thin text-[10px] uppercase tracking-widest">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
