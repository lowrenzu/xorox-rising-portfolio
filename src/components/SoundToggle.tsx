"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, getSoundEnabled, Sounds } from "@/hooks/useSoundEngine";

export default function SoundToggle() {
    const [enabled, setEnabled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggle = () => {
        const next = !enabled;
        setEnabled(next);
        setSoundEnabled(next);
        if (next) {
            // Play a small confirmation sound after enabling
            setTimeout(() => Sounds.click(), 50);
        }
    };

    if (!mounted) return null;

    return (
        <motion.button
            onClick={toggle}
            title={enabled ? "Couper le son" : "Activer l'ambiance sonore"}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-3 py-2 bg-black/60 border border-white/10 backdrop-blur-md hover:border-teal-accent/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
        >
            {/* Animated rings when enabled */}
            <AnimatePresence>
                {enabled && (
                    <>
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inset-0 border border-teal-accent/30 pointer-events-none"
                        />
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0.4 }}
                            animate={{ scale: 2.4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                            className="absolute inset-0 border border-teal-accent/20 pointer-events-none"
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Icon */}
            <motion.div
                animate={{ color: enabled ? "#25d1f4" : "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
            >
                {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </motion.div>

            {/* Label */}
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] relative z-10"
                style={{ color: enabled ? "#25d1f4" : "rgba(255,255,255,0.3)" }}>
                {enabled ? "SON ON" : "SON OFF"}
            </span>

            {/* Equalizer bars when enabled */}
            <AnimatePresence>
                {enabled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-end gap-[2px] h-3 relative z-10"
                    >
                        {[0.4, 0.9, 0.6, 1, 0.7].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-[2px] bg-teal-accent/70 rounded-full"
                                animate={{ scaleY: [h, h * 0.4, h * 0.8, h * 0.2, h] }}
                                transition={{
                                    duration: 0.8 + i * 0.15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1
                                }}
                                style={{ height: "100%", transformOrigin: "bottom" }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
