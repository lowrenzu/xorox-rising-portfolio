"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Play, Pause } from "lucide-react";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const isScrolling = useRef(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => { });
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

        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
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

    // Dynamic background colors based on section
    useEffect(() => {
        const root = document.documentElement;

        const palettes = {
            "#": {
                c1: "rgba(37, 209, 244, 0.4)", // Teal
                c2: "rgba(168, 85, 247, 0.45)", // Purple
                c3: "rgba(245, 176, 65, 0.4)"  // Gold
            },
            "#factions": {
                c1: "rgba(168, 85, 247, 0.4)", // Purple
                c2: "rgba(239, 68, 68, 0.35)",  // Red
                c3: "rgba(37, 209, 244, 0.3)"  // Teal
            },
            "#story": {
                c1: "rgba(30, 64, 175, 0.45)", // Dark Blue
                c2: "rgba(37, 209, 244, 0.35)", // Teal
                c3: "rgba(168, 85, 247, 0.3)"  // Purple
            },
            "#creation": {
                c1: "rgba(245, 176, 65, 0.45)", // Gold
                c2: "rgba(220, 38, 38, 0.35)",  // Crimson
                c3: "rgba(168, 85, 247, 0.3)"  // Purple
            },
            "#media": {
                c1: "rgba(37, 209, 244, 0.4)", // Teal
                c2: "rgba(168, 85, 247, 0.45)", // Purple
                c3: "rgba(30, 64, 175, 0.4)"  // Dark Blue
            }
        };

        const active = palettes[activeSection as keyof typeof palettes] || palettes["#"];

        root.style.setProperty("--c1", active.c1);
        root.style.setProperty("--c2", active.c2);
        root.style.setProperty("--c3", active.c3);
    }, [activeSection]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close mobile menu if open
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
            {/* Mobile Hamburger Button */}
            <div className="md:hidden fixed bottom-8 right-6 z-[130] flex items-center gap-4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-4 bg-black/80 backdrop-blur-xl border border-teal-accent/30 rounded-full text-teal-accent hover:border-teal-accent/50 transition-all shadow-[0_0_20px_rgba(37,209,244,0.3)] active:scale-90"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Overlay Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="md:hidden fixed inset-0 z-[105] bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 border-l border-white/10"
                    >
                        <div className="flex flex-col gap-8 w-full max-w-xs text-center">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className={`text-2xl font-light uppercase tracking-[0.3em] transition-all ${activeSection === link.href ? "text-teal-accent" : "text-white/60 hover:text-white"}`}
                                >
                                    <span className="text-[10px] font-mono opacity-30 mr-4 tracking-widest">{link.code}</span>
                                    {link.name}
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"
                            />

                            <motion.button
                                onClick={togglePlay}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className={`flex items-center justify-center gap-4 py-4 rounded-xl border transition-all ${isPlaying ? "bg-teal-accent/10 border-teal-accent/30 text-teal-accent" : "border-white/10 text-white/60"}`}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                <span className="text-sm font-mono tracking-[0.2em] uppercase">
                                    {isPlaying ? "Interview ON" : "Écouter l'Interview"}
                                </span>
                            </motion.button>
                        </div>

                        <div className="absolute bottom-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                            System Status: Ready
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Side Navigation (Original style, but hidden on small screens) */}
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
                className="hidden md:flex fixed z-[100] flex-col items-end justify-center gap-4 right-4 top-1/2 -translate-y-1/2 md:translate-x-0 p-0 rounded-none w-max border-transparent"
                aria-label="Navigation principale"
            >
                {/* Initialization label */}
                <AnimatePresence>
                    {isInitializing && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute -right-2 top-[-40px] whitespace-nowrap"
                        >
                            <span className="text-[9px] font-mono text-teal-accent bg-teal-accent/10 px-2 py-0.5 border border-teal-accent/20 rounded-sm">
                                STATUS: LINK_INITIALIZED_004
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Menu label */}
                <span
                    className={`text-[9px] font-mono uppercase tracking-[0.4em] mb-1 transition-colors duration-500 ${isInitializing ? "text-teal-accent" : "text-white/20"
                        }`}
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    Navigation
                </span>

                <div className="w-px h-4 bg-white/10 self-center" />

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
                            <div className={`flex items-center gap-1.5 justify-end w-[120px] transition-transform duration-300 origin-right ${isActive ? "scale-[1.3]" : "group-hover:scale-[1.3]"}`}>
                                <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌜</span>
                                <span
                                    className={`text-[9.5px] font-mono uppercase tracking-[0.25em] transition-all duration-300 text-right ${isActive
                                        ? "text-teal-accent drop-shadow-[0_0_8px_#25d1f4]"
                                        : "text-white/70 group-hover:text-white"
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
                    <div className={`flex items-center gap-1.5 justify-end w-[120px] transition-transform duration-300 origin-right ${isPlaying ? "scale-[1.1]" : "group-hover:scale-[1.2]"}`}>
                        <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isPlaying ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌜</span>
                        <span className={`text-[9.5px] font-mono uppercase tracking-[0.25em] transition-all duration-300 text-right ${isPlaying
                            ? "text-teal-accent drop-shadow-[0_0_8px_#25d1f4]"
                            : "text-white/70 group-hover:text-white"
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
