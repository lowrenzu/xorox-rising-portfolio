"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroesData, type Character } from "@/data/filmData";
import CharacterModal from "./CharacterModal";
import SectionHeader from "./SectionHeader";
import { useSoundEngine } from "@/hooks/useSoundEngine";

const categories = [
    { id: "tous", label: "Tous", color: "#25d1f4" }, // Teal Default
    { id: "hros", label: "Héros", color: "#3b82f6" }, // Blue
    { id: "comploteurs", label: "Comploteurs", color: "#ef4444" }, // Red
    { id: "animaux", label: "Animaux", color: "#f5b041" }, // Yellow
    { id: "creatures", label: "Créatures", color: "#f5b041" }, // Yellow
    { id: "mchant", label: "XoroX", color: "#ef4444" }, // Red
];

export default function CharacterGallery() {
    const [activeCategory, setActiveCategory] = useState<string>("tous");
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const { click, hover, modalOpen, modalClose } = useSoundEngine();

    const openCharacter = (char: Character, themeColor: string) => {
        click(); modalOpen();
        setSelectedCharacter({ ...char, themeColor });
    };
    const closeCharacter = () => { modalClose(); setSelectedCharacter(null); };
    const changeCategory = (id: string) => { hover(); setActiveCategory(id); };

    const filteredCharacters = activeCategory === "tous"
        ? heroesData
        : heroesData.filter((c) => c.cat === activeCategory);

    // Helper to determine character theme color
    const getCharacterThemeColor = (char: Character) => {
        if (char.cat === 'comploteurs' || char.cat === 'mchant' || char.name === 'XoroX') return "#ef4444"; // Red
        const name = char.name.toLowerCase();
        if (['clémence', 'béatrice', 'chloé'].some(n => name.includes(n))) return "#a855f7"; // Purple for girls
        if (['nicolas', 'arthur', 'jérémy', 'alexis', 'idriss', 'andré', 'aubontweet', 'charles'].some(n => name.includes(n))) return "#3b82f6"; // Blue for boys
        return "#f5b041"; // Yellow for others (Nala, Zorz, etc.)
    };

    return (
        <div className="w-full px-0 py-8 relative">
            <SectionHeader
                title="Les Factions"
                label="// CLASSIFICATION : ACTEURS"
                description="Profils des héros de la résistance, leurs antagonistes, et les créatures de la planète-prison."
                alignment="center"
            />
            {/* HUD-style horizontal filters */}
            <div className="flex items-center justify-start sm:justify-center gap-1 mb-10 px-4 sm:px-0 overflow-x-auto pb-4 custom-scrollbar whitespace-nowrap w-full">
                {categories.map((cat, i) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <React.Fragment key={cat.id}>
                            <motion.button
                                key={cat.id}
                                onClick={() => changeCategory(cat.id)}
                                className="group flex items-center gap-2 px-3 py-2 cursor-pointer"
                                aria-label={cat.label}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                {/* Dot indicator */}
                                <div className="relative w-2 h-2 flex items-center justify-center">
                                    <motion.div
                                        className="rounded-full"
                                        animate={isActive
                                            ? { width: 6, height: 6, backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }
                                            : { width: 4, height: 4, backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "none" }
                                        }
                                        whileHover={{ scale: 1.5, backgroundColor: cat.color }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                    {isActive && <div className="absolute inset-0 rounded-full border animate-ping" style={{ borderColor: `${cat.color}66` }} />}
                                </div>
                                <div className="relative flex flex-col items-center justify-center">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-[10px] font-mono font-light transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} style={{ color: cat.color }}>⌜</span>
                                        <span
                                            className={`text-[9px] font-mono uppercase tracking-[0.25em] transition-colors duration-200 z-10 ${isActive ? "" : "text-white/60 group-hover:text-white"}`}
                                            style={isActive ? { color: cat.color, textShadow: `0 0 8px ${cat.color}cc` } : {}}
                                        >
                                            {cat.label}
                                        </span>
                                        <span className={`text-[10px] font-mono font-light transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} style={{ color: cat.color }}>⌟</span>
                                    </div>
                                    <div className={`absolute -bottom-1.5 left-0 right-0 h-[1px] transition-all duration-300 origin-center pointer-events-none ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`} style={{ backgroundImage: `linear-gradient(to right, transparent, ${cat.color}, transparent)` }} />
                                </div>
                            </motion.button>
                            {i < categories.length - 1 && (
                                <div className="w-px h-3 bg-white/10" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCharacters.map((char) => {
                        const themeColor = getCharacterThemeColor(char);

                        return (
                            <motion.div
                                layout
                                key={char.name}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
                                onClick={() => openCharacter(char, themeColor)}
                                onMouseEnter={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) {
                                        video.muted = false;
                                        video.volume = 0.2;
                                        video.play().catch(() => { });
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) {
                                        video.muted = true;
                                        video.pause();
                                    }
                                }}
                                className={`group cursor-pointer relative overflow-hidden aspect-[3/4] border border-white/10 bg-black/70 hover:bg-black/90 transition-all duration-500 dynamic-shadow`}
                                style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                            >
                                {/* Geometric Corner Accents */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ borderColor: themeColor }} />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ borderColor: themeColor }} />

                                <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-l to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" style={{ backgroundImage: `linear-gradient(to left, ${themeColor}40, transparent)` }} />
                                <div className="absolute bottom-0 left-0 w-[50%] h-[1px] bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}40, transparent)` }} />

                                {/* Image/Video Layer */}
                                {char.video || (char.img && char.img.endsWith('.webm')) ? (
                                    <video
                                        src={char.video || char.img}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={char.img}
                                        alt={char.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // transparent 1x1 fallback
                                        }}
                                    />
                                )}

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-[#010203]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />

                                {/* Content Layer */}
                                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                                    <div className="flex flex-col">
                                        <span
                                            className="text-[9px] font-mono uppercase tracking-[0.3em] mb-1 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                                            style={{ color: themeColor }}
                                        >
                                            ID: {char.name.substring(0, 3)}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-light uppercase text-white/90 group-hover:text-white mb-0.5 tracking-widest leading-none transition-colors duration-300 border-l-2 pl-2" style={{ borderColor: themeColor }}>
                                            {char.name.split(' ')[0]}
                                        </h3>
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase mt-1 opacity-80" style={{ color: themeColor }}>
                                            {char.role}
                                        </p>

                                        <div className="h-px w-full mt-3 mb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-white/20 transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}40, transparent)` }} />

                                        <div className="h-0 group-hover:h-[60px] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-white/50 text-[11px] line-clamp-3 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
                                                {char.inspiration}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sci-fi UI Elements (Top Right Indicator) */}
                                <div
                                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                                    style={{ backgroundColor: themeColor, boxShadow: `0 0 8px ${themeColor}` }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            <CharacterModal
                character={selectedCharacter}
                onClose={closeCharacter}
            />
        </div>
    );
}
