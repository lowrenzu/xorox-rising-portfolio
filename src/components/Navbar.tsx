"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const navLinks = [
    { name: "Home", href: "#", code: "00" },
    { name: "Factions", href: "#factions", code: "01" },
    { name: "Histoire", href: "#story", code: "02" },
    { name: "Création", href: "#creation", code: "03" },
    { name: "Média", href: "#media", code: "04" }
];

// Custom smooth scroll with cinematic easing (easeInOutExpo)
function smoothScrollTo(targetY: number, duration = 1300) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutExpo = (t: number) => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    };

    const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutExpo(progress));
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("#");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const isScrolling = useRef(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        // Audio Ducking System - Lowers volume when character videos are playing
        const handleDuck = () => { audio.volume = 0.2; };
        const handleRestore = () => { audio.volume = 1.0; };
        window.addEventListener('character-video-start', handleDuck);
        window.addEventListener('character-video-stop', handleRestore);
        window.addEventListener('character-modal-close', handleRestore);

        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
            window.removeEventListener('character-video-start', handleDuck);
            window.removeEventListener('character-video-stop', handleRestore);
            window.removeEventListener('character-modal-close', handleRestore);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitializing(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const viewportMid = window.innerHeight / 2;
            let current = "#";
            for (let i = navLinks.length - 1; i >= 0; i--) {
                const href = navLinks[i].href;
                if (href === "#") continue;
                const section = document.getElementById(href.slice(1));
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= viewportMid) {
                        current = href;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 1200);

        if (href === "#") {
            smoothScrollTo(0, 1000);
        } else {
            const target = document.querySelector(href) as HTMLElement | null;
            if (target) smoothScrollTo(target.offsetTop, 1100);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, x: 20 }}
                animate={isInitializing
                    ? {
                        opacity: [0, 1, 0.4, 1, 0.6, 1],
                        x: [20, 0, 0, 0, 0, 0],
                    }
                    : { opacity: 1, x: 0 }
                }
                transition={{
                    duration: isInitializing ? 0.8 : 0.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    delay: 1.5
                }}
                className="fixed z-[100] flex md:flex-col items-center md:items-end justify-center gap-4 md:gap-4 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 bg-black/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-6 py-3 md:p-0 rounded-full md:rounded-none w-max border border-white/10 md:border-transparent"
                aria-label="Navigation principale"
            >
                {/* Initialization label */}
                <AnimatePresence>
                    {isInitializing && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="hidden md:block absolute -right-2 top-[-40px] whitespace-nowrap"
                        >
                            <span className="text-[9px] font-mono text-teal-accent bg-teal-accent/10 px-2 py-0.5 border border-teal-accent/20 rounded-sm">
                                STATUS: LINK_INITIALIZED_004
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Menu label */}
                <span
                    className={`hidden md:block text-[9px] font-mono uppercase tracking-[0.4em] mb-1 transition-colors duration-500 ${isInitializing ? "text-teal-accent" : "text-white/20"
                        }`}
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    Navigation
                </span>

                <div className="hidden md:block w-px h-4 bg-white/10 self-center" />

                {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.href;
                    return (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 + idx * 0.1 }}
                            className="group relative flex items-center justify-start gap-3 cursor-pointer p-1 w-full max-w-[120px]"
                            aria-label={link.name}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`hidden md:flex items-center gap-1.5 justify-end w-[120px] transition-transform duration-300 origin-right ${isActive ? "scale-[1.4]" : "group-hover:scale-[1.4]"}`}>
                                <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌜</span>
                                <span
                                    className={`text-[9.5px] font-mono uppercase tracking-[0.25em] transition-all duration-300 text-right ${isActive
                                        ? "text-teal-accent drop-shadow-[0_0_8px_#25d1f4] shadow-[#25d1f4]"
                                        : "text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_12px_#25d1f4]"
                                        }`}
                                >
                                    {link.name}
                                </span>
                                <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌟</span>
                            </div>
                            <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                                <motion.div
                                    className={`rounded-full ${isActive ? "bg-teal-accent" : "bg-white/30"}`}
                                    animate={isActive
                                        ? { width: 8, height: 8, boxShadow: "0 0 10px #25d1f4" }
                                        : isInitializing
                                            ? { scale: [1, 1.5, 1], backgroundColor: ["#ffffff4d", "#25d1f4", "#ffffff4d"] }
                                            : { width: 5, height: 5, boxShadow: "none" }
                                    }
                                    transition={isInitializing
                                        ? { repeat: 2, duration: 0.4, delay: 2 + idx * 0.1 }
                                        : { type: "spring", stiffness: 120, damping: 20 }
                                    }
                                    whileHover={{ scale: 1.6, backgroundColor: "#25d1f4", boxShadow: "0 0 12px #25d1f4" }}
                                />
                                {(isActive || isInitializing) && (
                                    <div className={`absolute inset-0 rounded-full border border-teal-accent/40 ${isInitializing ? "animate-[ping_1.5s_infinite]" : "animate-ping"}`} />
                                )}
                            </div>
                        </motion.a>
                    );
                })}

                <div className="w-px h-4 bg-white/10 self-center mx-1 md:mx-0" />

                {/* Mini Player */}
                <motion.button
                    onClick={togglePlay}
                    title={isPlaying ? "Mettre en pause" : "Écouter l'interview"}
                    className="group relative flex items-center justify-start gap-3 cursor-pointer p-1 w-full max-w-[120px]"
                    whileTap={{ scale: 0.95 }}
                >
                    <div className={`hidden md:flex items-center gap-1.5 justify-end w-[120px] transition-transform duration-300 origin-right ${isPlaying ? "scale-[1.1]" : "group-hover:scale-[1.4]"}`}>
                        <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isPlaying ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌜</span>
                        <span className={`text-[9.5px] font-mono uppercase tracking-[0.25em] transition-all duration-300 text-right ${isPlaying
                            ? "text-teal-accent drop-shadow-[0_0_8px_#25d1f4] shadow-[#25d1f4]"
                            : "text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_12px_#25d1f4]"
                            }`}>
                            {isPlaying ? "INTERVIEW_ON" : "INTERVIEW"}
                        </span>
                        <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌟</span>
                    </div>

                    <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                        <motion.div
                            className={`rounded-full ${isPlaying ? "bg-teal-accent" : "bg-white/30"}`}
                            animate={isPlaying
                                ? { width: 8, height: 8, boxShadow: "0 0 10px #25d1f4" }
                                : { width: 5, height: 5, boxShadow: "none" }
                            }
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            whileHover={{ scale: 1.6, backgroundColor: "#25d1f4", boxShadow: "0 0 12px #25d1f4" }}
                        />
                        {isPlaying && (
                            <div className="absolute inset-0 rounded-full border border-teal-accent/40 animate-ping" />
                        )}
                    </div>
                </motion.button>

                {/* Embedded Audio Element */}
                <audio ref={audioRef} src="/audio/interview_film.m4a" preload="metadata" />

                <div className="flex items-center gap-1.5">
                    <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${!isPlaying ? "bg-white/20" : "bg-teal-accent/50 animate-pulse"
                        }`} />
                </div>
            </motion.nav>
        </>
    );
}
