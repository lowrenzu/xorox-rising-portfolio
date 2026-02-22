"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

const backgroundVideos = [
    "/assets/hero_videos/creature3_optimized.webm",
    "/assets/hero_videos/bea_conspi.webm",
    "/assets/hero_videos/abtf_rue.webm",
    "/assets/hero_videos/alexis_andre_cave.webm",
    "/assets/hero_videos/atalntis_flood.webm",
    "/assets/hero_videos/atlantis_blue_to_red.webm",
    "/assets/hero_videos/atlantis_collapse.webm",
    "/assets/hero_videos/atlantis_collapse2.webm",
    "/assets/hero_videos/atlantis_inside_blue.webm",
    "/assets/hero_videos/atlantis_inside_red_blue.webm",
    "/assets/hero_videos/atlantis_underwater.webm",
    "/assets/hero_videos/charles_titanic.webm",
    "/assets/hero_videos/charles_titanic_detail_mp4.webm",
    "/assets/hero_videos/cocomploteurs_verite_x.webm",
    "/assets/hero_videos/tall_whites.webm"
];

export default function Hero() {
    const [visibleLayer, setVisibleLayer] = useState<0 | 1>(0);
    const [videoIndices, setVideoIndices] = useState<[number, number | null]>([0, null]);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef0 = useRef<HTMLVideoElement>(null);
    const videoRef1 = useRef<HTMLVideoElement>(null);

    // Stable random values to prevent React impure render warnings
    const glitchDelay1 = useMemo(() => Math.random() * 5 + 2, []);
    const glitchDelay2 = useMemo(() => Math.random() * 8 + 3, []);

    const handleVideoEnd = (layer: 0 | 1) => {
        if (layer !== visibleLayer) return;

        const currentIndex = videoIndices[layer]!;
        let nextIndex = Math.floor(Math.random() * backgroundVideos.length);
        if (nextIndex === currentIndex) {
            nextIndex = (currentIndex + 1) % backgroundVideos.length;
        }

        const nextLayer = layer === 0 ? 1 : 0;
        setVideoIndices(prev => {
            const next = [...prev] as [number, number];
            next[nextLayer] = nextIndex;
            return next;
        });
    };

    const handleCanPlay = (layer: 0 | 1) => {
        if (!isVideoLoaded) setIsVideoLoaded(true);
        // Switch visibility to the new layer once it is ready
        if (layer !== visibleLayer && videoIndices[layer] !== null) {
            setVisibleLayer(layer);
        }
    };

    // Use IntersectionObserver to play/pause video based on viewport visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (videoRef0.current && videoIndices[0] !== null) videoRef0.current.play().catch(() => { });
                        if (videoRef1.current && videoIndices[1] !== null) videoRef1.current.play().catch(() => { });
                    } else {
                        if (videoRef0.current) videoRef0.current.pause();
                        if (videoRef1.current) videoRef1.current.pause();
                    }
                });
            },
            { threshold: 0.1 } // Trigger when at least 10% is visible
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [videoIndices]); // Re-bind if the videos change

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end items-center pb-16">



            {/* Background Video Cover */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-black"
            >
                {/* L'attribut preload="auto" indique au navigateur de télécharger la vidéo au plus vite */}
                {/* Suppression de "isMounted" : la balise existe dès le HTML serveur */}
                {/* VIDEO LAYER 0 */}
                <video
                    ref={videoRef0}
                    src={videoIndices[0] !== null ? backgroundVideos[videoIndices[0]] : undefined}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ease-in-out ${visibleLayer === 0 && isVideoLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={() => handleCanPlay(0)}
                    onEnded={() => handleVideoEnd(0)}
                />

                {/* VIDEO LAYER 1 */}
                <video
                    ref={videoRef1}
                    src={videoIndices[1] !== null ? backgroundVideos[videoIndices[1]] : undefined}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ease-in-out ${visibleLayer === 1 && isVideoLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={() => handleCanPlay(1)}
                    onEnded={() => handleVideoEnd(1)}
                />

                {/* Instant Poster Fallback using Next.js Image optimization */}
                <Image
                    src="/assets/hero_videos/hero_meditation_fallback.png"
                    alt="Background initialisation"
                    fill
                    priority
                    sizes="100vw"
                    className={`object-cover object-center z-0 transition-opacity duration-[1500ms] ${isVideoLoaded ? 'opacity-0' : 'opacity-60'}`}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </motion.div>

            {/* Content — pushed to bottom left for cinematic asymmetry */}
            <div className="relative z-10 w-full max-w-5xl px-4 md:px-8 flex flex-col items-start">

                {/* Classified label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-3 mb-3"
                >
                    <div className="w-4 h-px bg-teal-accent/60" />
                    <span className="text-[9px] font-mono text-teal-accent/70 uppercase tracking-[0.4em]">
                        Projet de film / 3D / Animation de Lowrenzu
                    </span>
                    <div className="w-1 h-1 rounded-full bg-teal-accent/50 animate-pulse" />
                </motion.div>

                {/* Main title block */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} // Cinematic easeOutExpo
                    className="flex flex-col items-start w-full relative group"
                >
                    {/* Decorative vertical line accent */}
                    <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-accent/60 via-teal-accent/10 to-transparent" />

                    {/* L'Artefact — Layered Glitch Style */}
                    <div className="relative">
                        <motion.h1
                            className="text-4xl md:text-8xl font-light uppercase leading-none tracking-tighter relative z-10"
                            style={{
                                color: "#ffffff",
                                textShadow: "0 0 40px rgba(37,209,244,0.3)"
                            }}
                        >
                            <span className="relative inline-block">
                                L&apos;Artefact
                                {/* Glitch Layer 1 - Cyan Shift */}
                                <motion.span
                                    className="absolute inset-0 text-teal-accent opacity-50 mix-blend-screen pointer-events-none"
                                    animate={{
                                        x: [-2, 2, -1, 0],
                                        opacity: [0.5, 0.2, 0.5, 0]
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        repeat: Infinity,
                                        repeatDelay: glitchDelay1
                                    }}
                                >
                                    L&apos;Artefact
                                </motion.span>
                                {/* Glitch Layer 2 - Magenta-ish/White Highlight */}
                                <motion.span
                                    className="absolute inset-0 text-white opacity-0 pointer-events-none"
                                    animate={{
                                        clipPath: [
                                            "inset(80% 0 0 0)",
                                            "inset(10% 0 70% 0)",
                                            "inset(50% 0 30% 0)",
                                            "inset(0 0 0 0)"
                                        ],
                                        opacity: [0, 0.8, 0, 0.3, 0],
                                        x: [0, -5, 5, 0]
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatDelay: glitchDelay2
                                    }}
                                >
                                    L&apos;Artefact
                                </motion.span>
                            </span>
                        </motion.h1>

                        {/* Background glowing aura */}
                        <div className="absolute inset-0 bg-teal-accent/5 blur-[80px] -z-10 rounded-full" />
                    </div>

                    {/* Elegant shimmer separator */}
                    <div className="relative w-full max-w-2xl h-px mt-4 mb-2 overflow-hidden bg-white/10">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(to right, #25d1f4 0%, transparent 80%)",
                                opacity: 0.6
                            }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-0 h-full w-32"
                            style={{
                                background: "linear-gradient(to right, transparent, rgba(37,209,244,0.8), transparent)",
                            }}
                            animate={{ x: ["-100%", "500%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* de la Vérité — Staggered reveal, high technical font */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                        className="w-full max-w-2xl flex justify-between items-end pl-1"
                    >
                        <div className="flex flex-col">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                                className="text-[10px] font-mono text-teal-accent/50 tracking-[0.6em] uppercase mb-1"
                            >
                                Operation // Truth_Seeker
                            </motion.span>
                            <div className="flex items-baseline gap-4">
                                <motion.h2
                                    className="text-lg sm:text-xl md:text-3xl font-light uppercase tracking-[0.4em] text-teal-accent/90"
                                    style={{
                                        fontFamily: "var(--font-outfit)",
                                        textShadow: "0 0 20px rgba(37,209,244,0.4)"
                                    }}
                                >
                                    de la Vérité
                                </motion.h2>
                                <motion.div
                                    className="h-[2px] flex-1 bg-gradient-to-r from-teal-accent/40 to-transparent mb-2 hidden md:block"
                                    style={{ transformOrigin: "left" }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Technical Coordinates / Meta info */}
                        <div className="text-right hidden sm:block">
                            <span className="block text-[7px] font-mono text-white/20 tracking-tighter">DATASET_ID: ATF_01-V</span>
                            <span className="block text-[7px] font-mono text-white/20 tracking-tighter">COORD: 45.4215° N, 75.6972° W</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="mt-6 flex items-center gap-3"
                >
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent"
                    />
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.3em]">Défiler</span>
                </motion.div>
            </div>
        </section>
    );
}
