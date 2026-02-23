"use client";

import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
    title: string;
    label?: string;
    description?: string;
    alignment?: "left" | "center";
    className?: string;
    descriptionClassName?: string;
}

/**
 * Standardized Section Header to match the Hero's premium Cinematic Glitch style.
 */
export default function SectionHeader({
    title,
    label,
    description,
    alignment = "center",
    className = "",
    descriptionClassName = "mt-6 text-white/40 text-[10px] md:text-xs font-light max-w-xl leading-relaxed uppercase tracking-[0.2em]"
}: SectionHeaderProps) {
    const isCenter = alignment === "center";

    // Stable random values to prevent React impure render warnings
    const [glitchDelay1] = React.useState(() => Math.random() * 10 + 4);
    const [glitchDelay2] = React.useState(() => Math.random() * 12 + 6);

    return (
        <div className={`relative flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} ${className || "mb-14"}`}>
            {/* HUD Label */}
            {label && (
                <motion.div
                    initial={{ opacity: 0, x: isCenter ? 0 : -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-3"
                >
                    {!isCenter && <div className="w-4 h-px bg-teal-accent/60" />}
                    <span className="text-[9px] font-mono text-teal-accent/80 uppercase tracking-[0.5em]">
                        {label}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-accent/40 animate-pulse" />
                    {isCenter && <div className="w-24 h-px bg-gradient-to-r from-teal-accent/40 to-transparent" />}
                </motion.div>
            )}

            {/* Main Title Block */}
            <div className="relative group">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light uppercase leading-none tracking-tighter relative z-10 text-white"
                    style={{
                        textShadow: "0 0 40px rgba(37,209,244,0.15)"
                    }}
                >
                    <span className="relative inline-block">
                        {title}

                        {/* Glitch Layer 1 - Cyan Shift (Random triggers) */}
                        <motion.span
                            className="absolute inset-0 text-teal-accent opacity-0 mix-blend-screen pointer-events-none"
                            animate={{
                                x: [-2, 2, -1, 0],
                                opacity: [0, 0.4, 0.2, 0]
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatDelay: glitchDelay1
                            }}
                        >
                            {title}
                        </motion.span>

                        {/* Glitch Layer 2 - White Highlight Flash */}
                        <motion.span
                            className="absolute inset-0 text-white opacity-0 pointer-events-none"
                            animate={{
                                opacity: [0, 0.7, 0]
                            }}
                            transition={{
                                duration: 0.1,
                                repeat: Infinity,
                                repeatDelay: glitchDelay2
                            }}
                        >
                            {title}
                        </motion.span>
                    </span>
                </motion.h2>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="h-[2px] mt-4 bg-gradient-to-r from-transparent via-teal-accent/40 to-transparent relative overflow-hidden"
                >
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                </motion.div>
            </div>

            {/* Sub-text / Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className={descriptionClassName}
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
