"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, Activity, Database, Terminal } from "lucide-react";
// Unused imports removed: Download, Shield, Cpu, ChevronRight
import type { Character } from "@/data/filmData";

export default function CharacterModal({
    character,
    onClose,
}: {
    character: Character | null;
    onClose: () => void;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Reset index when character changes
    useEffect(() => {
        setActiveIndex(0);
    }, [character?.name]);

    const mediaList = useMemo(() => {
        if (!character) return [];
        const items = [];
        if (character.classe) items.push({ type: 'image', url: character.classe, label: "VUE 3D / CLASSE" });
        if (character.video) items.push({ type: 'video', url: character.video, label: "VIDÉO PROFIL" });
        if (character.img && character.img !== character.classe) items.push({ type: 'image', url: character.img, label: "ILLUSTRATION" });
        if (character.portrait) items.push({ type: 'image', url: character.portrait, label: "PORTRAIT" });
        if (character.model) items.push({ type: 'image', url: character.model, label: "MODEL SHEET" });
        return items;
    }, [character]);

    useEffect(() => {
        if (!character) return;
        const activeMedia = mediaList[activeIndex];
        const isVideoPlaying = activeMedia?.type === 'video';

        if (isVideoPlaying) {
            window.dispatchEvent(new CustomEvent('character-video-start'));
        } else {
            window.dispatchEvent(new CustomEvent('character-video-stop'));
        }

        return () => {
            window.dispatchEvent(new CustomEvent('character-video-stop'));
        };
    }, [activeIndex, mediaList, character]);

    useEffect(() => {
        return () => {
            window.dispatchEvent(new CustomEvent('character-modal-close'));
        };
    }, []);

    if (!character) return null;

    const activeMedia = mediaList[activeIndex];

    // Extract dynamic theme color passed from CharacterGallery, or fallback to teal
    const themeColor = character.themeColor || "#25d1f4";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
            >
                {/* Global HUD Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[101] bg-[length:100%_2px,3px_100%]" style={{ backgroundImage: `linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, ${themeColor}10, transparent, transparent)` }} />

                <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-[1400px] max-h-[90vh] md:max-h-[75vh] bg-[#010203] border rounded-sm overflow-hidden flex flex-col md:flex-row relative cursor-default"
                    style={{ borderColor: `${themeColor}25`, boxShadow: `0 0 120px rgba(0,0,0,1), inset 0 0 20px ${themeColor}05` }}
                >
                    {/* Visual Interface Column - 60% Width for Cinematic focus */}
                    <div className="w-full md:w-[60%] relative flex flex-col bg-[#050608] border-r" style={{ borderColor: `${themeColor}10` }}>
                        {/* Upper Interface Bar */}
                        <div className="h-10 border-b flex items-center justify-between px-6 bg-black/40" style={{ borderColor: `${themeColor}15` }}>
                            <div className="flex items-center gap-4">
                                <Activity size={12} className="animate-pulse" style={{ color: themeColor, opacity: 0.7 }} />
                                <span className="text-[8px] font-mono uppercase tracking-[0.4em]" style={{ color: themeColor, opacity: 0.6 }}>VISUAL_DUMP // LIVE_FEED</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="text-[7px] font-mono text-white/20 mr-4">LATENCY: 12ms</span>
                                <div className="w-1 h-1" style={{ backgroundColor: themeColor, opacity: 0.2 }} />
                                <div className="w-1 h-1" style={{ backgroundColor: themeColor, opacity: 0.2 }} />
                                <div className="w-1 h-1" style={{ backgroundColor: themeColor, opacity: 0.5 }} />
                            </div>
                        </div>

                        {/* Main Media Viewer */}
                        <div className="flex-1 relative flex items-center justify-center p-4 min-h-[30vh] md:min-h-0 bg-gradient-to-b from-black to-[#080a0c] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMedia?.url}
                                    initial={{ opacity: 0, scale: 1.02, filter: "brightness(2) contrast(1.2) blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "brightness(1) contrast(1) blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative z-10"
                                >
                                    {activeMedia?.type === 'video' ? (
                                        <video
                                            ref={videoRef}
                                            src={activeMedia.url}
                                            autoPlay loop playsInline
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <img
                                            src={activeMedia?.url}
                                            className="w-full h-full object-contain"
                                            alt={character.name}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Viewport UI Overlays - Scaled for landscape */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: `${themeColor}4d` }} />
                                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r" style={{ borderColor: `${themeColor}4d` }} />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l" style={{ borderColor: `${themeColor}4d` }} />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: `${themeColor}4d` }} />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px" style={{ backgroundColor: `${themeColor}0a` }} />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-48" style={{ backgroundColor: `${themeColor}0a` }} />

                                <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 border-l" style={{ color: `${themeColor}cc`, backgroundColor: `${themeColor}0a`, borderColor: themeColor, boxShadow: `0 0 15px ${themeColor}1a` }}>
                                        SOURCE_{activeIndex}: {activeMedia?.label || "NONE"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Media Selector Strip - Compact for landscape */}
                        <div className="h-20 bg-black/60 border-t border-teal-accent/10 px-8 flex items-center gap-4 overflow-x-auto disabled-scrollbar">
                            {mediaList.map((media, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative shrink-0 w-24 h-12 rounded-sm overflow-hidden border transition-all duration-500 group/thumb ${activeIndex === idx
                                        ? 'scale-105'
                                        : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                                        }`}
                                    style={activeIndex === idx ? { borderColor: `${themeColor}99`, boxShadow: `0 0 20px ${themeColor}40` } : {}}
                                >
                                    {media.type === 'video' ? (
                                        <div className="w-full h-full relative">
                                            <video src={media.url} className="w-full h-full object-cover muted" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover/thumb:bg-white/10">
                                                <PlayCircle size={16} className="text-white/60" />
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={media.url} className="w-full h-full object-cover" alt="" />
                                    )}
                                    {activeIndex === idx && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: themeColor }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Intelligence Report Column - 40% Width */}
                    <div className="w-full md:w-[40%] p-8 md:p-12 lg:p-14 flex flex-col gap-8 overflow-y-auto custom-scrollbar relative bg-[#010203]">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/20 hover:text-teal-accent transition-colors z-50 p-2"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        {/* Header Section */}
                        <div className="space-y-4 relative z-10">
                            {/* Glowing background blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: themeColor }} />

                            <div className="absolute -top-4 -left-2 text-[80px] font-black font-mono text-white/[0.015] pointer-events-none select-none leading-none tracking-tighter">
                                {character.cat.slice(0, 4).toUpperCase()}
                            </div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 relative z-10">
                                <div className="h-px w-6" style={{ backgroundColor: `${themeColor}66` }} />
                                <span className="text-[9px] font-mono uppercase tracking-[0.5em] leading-none translate-y-[1px]" style={{ color: `${themeColor}99` }}>
                                    CLASSIFIED_DOSSIER
                                </span>
                            </motion.div>

                            <div className="space-y-1 relative z-10">
                                <motion.h2
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-5xl md:text-6xl font-light uppercase tracking-tighter text-white leading-[0.9]"
                                    style={{ textShadow: `0 0 40px ${themeColor}26` }}
                                >
                                    {character.name}
                                </motion.h2>
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-3 pt-4">
                                    <div className="px-2 py-1 border rounded-sm flex items-center justify-center" style={{ backgroundColor: `${themeColor}1a`, borderColor: `${themeColor}33` }}>
                                        <span className="text-[10px] font-mono uppercase tracking-widest font-medium leading-none translate-y-[1px]" style={{ color: themeColor }}>{character.role}</span>
                                    </div>
                                    <div className="h-[1px] flex-1" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}66, transparent)` }} />
                                </motion.div>
                            </div>
                        </div>

                        {/* Info Blocks - More compact for landscape */}
                        <div className="flex flex-col gap-8">
                            {/* Bio Data */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-30">
                                    <Database size={12} style={{ color: themeColor }} />
                                    <h4 className="text-[9px] font-medium tracking-[0.3em] uppercase text-white">DONNÉES_RÉPERTORIÉES</h4>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="p-3 border rounded-sm relative overflow-hidden" style={{ backgroundColor: `${themeColor}05`, borderColor: `${themeColor}0d` }}>
                                        <div className="absolute top-0 left-0 w-0.5 h-full" style={{ backgroundColor: `${themeColor}4d` }} />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.2em]">OCCUPATION_ID :</span>
                                            <span className="text-xs text-white/80 font-light">{character.realLife?.occ || "NON_IDENTIFIÉ"}</span>
                                        </div>
                                    </div>

                                    <div className="p-3 border rounded-sm relative overflow-hidden" style={{ backgroundColor: `${themeColor}05`, borderColor: `${themeColor}0d` }}>
                                        <div className="absolute top-0 left-0 w-0.5 h-full" style={{ backgroundColor: `${themeColor}4d` }} />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.2em]">ANALYSE_FAITS :</span>
                                            <span className="text-xs text-white/80 font-light">{character.realLife?.fact || "EN_COURS"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Behavioral Block */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 opacity-30">
                                    <Terminal size={12} style={{ color: themeColor }} />
                                    <h4 className="text-[9px] font-medium tracking-[0.3em] uppercase text-white">SYNTHÈSE_COMPORTEMENTALE</h4>
                                </div>

                                <div className="relative p-6 bg-white/[0.015] border border-white/5 rounded-sm group/essay">
                                    <div className="absolute top-0 left-0 w-[2px] h-6" style={{ backgroundColor: `${themeColor}66` }} />
                                    <blockquote className="text-base text-white/70 leading-relaxed italic font-light">
                                    &ldquo;{character.inspiration}&rdquo;
                                    </blockquote>
                                </div>
                            </div>
                        </div>

                        {/* Compact Footer */}
                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-20">
                            <span className="text-[7px] font-mono tracking-widest uppercase">LEVEL: OMEGA-4 // TS: CLASSIFIED</span>
                            <span className="text-[7px] font-mono tracking-[0.6em] uppercase" style={{ color: themeColor }}>STABLE</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
