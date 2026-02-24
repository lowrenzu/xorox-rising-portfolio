"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Terminal, Users, MapPin, Shield, Zap, Rocket,
    X, Fingerprint, Activity, Copy, Maximize2, Share2
} from "lucide-react";
import { storyData } from "@/data/filmData";
import SectionHeader from "./SectionHeader";
import { useSoundEngine } from "@/hooks/useSoundEngine";

// Helper to assign a specific theme and icon to each act
const getActTheme = (index: number) => {
    const themes = [
        { color: "#3b82f6", label: "Héros", icon: Users, media: "/images/story/reunion_secrete.webp", type: "image", desc: "La réunion secrète et le décryptage." },
        { color: "#a855f7", label: "Poursuite", icon: MapPin, media: "/images/story/poursuite_himalaya.webp", type: "image", desc: "Le crash et l'ascension périlleuse." },
        { color: "#f5b041", label: "Découverte", icon: Shield, media: "/images/story/la_base_du_domaine.webp", type: "image", desc: "L'exploration colossale." },
        { color: "#ef4444", label: "Confrontation", icon: Zap, media: "/images/story/confrontation_finale.webp", type: "image", desc: "Le duel contre l'Architecte." },
        { color: "#f5b041", label: "Révélation", icon: Rocket, media: "/images/story/activation_revelation.webp", type: "image", desc: "L'activation du Cristal." },
    ];
    return themes[index % themes.length];
};

export default function StorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModal, setActiveModal] = useState<number | null>(null);
    const [storyDetail, setStoryDetail] = useState<{ title: string, content: string, label: string } | null>(null);
    const { click, hover, modalOpen, modalClose } = useSoundEngine();

    const openModal = (i: number) => { click(); modalOpen(); setActiveModal(i); };
    const closeModal = () => { modalClose(); setActiveModal(null); };

    return (
        <section ref={containerRef} id="story" className="relative min-h-screen py-8 flex flex-col justify-center overflow-hidden">
            {/* Cyberpunk Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(var(--teal-accent) 1px, transparent 1px), linear-gradient(90deg, var(--teal-accent) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">

                {/* Header aligned to left */}
                <div className="w-full max-w-6xl mx-auto mb-4">
                    <SectionHeader
                        title="L'Histoire"
                        label="// ARCHIVES_ISBE"
                        alignment="left"
                        className="mb-0"
                    />
                </div>

                {/* Poster on left, Text blocks on right */}
                <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto mb-6 w-full items-stretch">
                    {/* Left: Poster */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-2/3 sm:w-1/2 md:w-1/4 lg:w-1/5 mx-auto md:mx-0 flex-shrink-0"
                    >
                        <div className="relative aspect-[2/3] w-full max-w-[340px] mx-auto rounded-none overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                            <Image
                                src="/assets/poster.png"
                                alt="L'Artefact de la Vérité Affiche"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 w-full h-[1px] bg-white/20 opacity-0 group-hover:opacity-50 blur-[1px] animate-scan-vertical pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Right: Text Boxes */}
                    <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col justify-between gap-6">
                        {/* P1 Description Card - Advanced HUD style */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(37, 209, 244, 0.08)" }}
                            onHoverStart={() => hover()}
                            onClick={() => {
                                click();
                                modalOpen();
                                setStoryDetail({
                                    title: "Synopsys // Entry_01",
                                    label: "// ARCHIVES_INTEL",
                                    content: storyData.summary.p1
                                });
                            }}
                            className="relative p-6 glass-panel border border-white/20 bg-black/80 overflow-hidden group dynamic-shadow cursor-pointer"
                        >
                            {/* HUD Decorative Elements */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-accent/40 group-hover:border-teal-accent/80 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-accent/40 group-hover:border-teal-accent/80 transition-colors" />

                            <div className="flex items-start gap-4">
                                <div className="hidden sm:flex flex-col items-center gap-2 mt-1">
                                    <div className="w-1 h-8 bg-gradient-to-b from-teal-accent to-transparent opacity-40" />
                                    <Terminal size={12} className="text-teal-accent opacity-60" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 flex-1">
                                            <span className="text-[8px] font-mono text-teal-accent/50 uppercase tracking-[0.3em]">Synopsys // Entry_01</span>
                                            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-accent/20 to-transparent" />
                                        </div>
                                        <span className="text-[7px] font-mono text-teal-accent/0 group-hover:text-teal-accent/60 transition-all duration-300 ml-4 tracking-widest uppercase">Lire l&apos;archive →</span>
                                    </div>
                                    <p className="text-white/90 text-[13px] md:text-sm lg:text-base font-light leading-relaxed tracking-wide text-left m-0 line-clamp-3 md:line-clamp-none">
                                        {storyData.summary.p1}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                            {/* P2 Context Panel - Mission Intel style */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(37, 209, 244, 0.1)" }}
                                onHoverStart={() => hover()}
                                onClick={() => {
                                    click();
                                    modalOpen();
                                    setStoryDetail({
                                        title: "Mission Protocol",
                                        label: "// OPS_DATALINK",
                                        content: storyData.summary.p2
                                    });
                                }}
                                className="p-5 glass-panel border border-white/20 border-l-2 border-l-teal-accent/60 bg-black/80 relative group overflow-hidden flex flex-col justify-center dynamic-shadow cursor-pointer"
                            >
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

                                <div className="absolute top-2 right-3 flex items-center gap-2">
                                    <span className="text-[6px] font-mono text-teal-accent/0 group-hover:text-teal-accent/40 transition-all duration-300 tracking-widest uppercase">Détails</span>
                                    <Users size={14} className="text-teal-accent opacity-20 group-hover:opacity-50" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-[9px] font-mono text-teal-accent/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-accent/30 animate-pulse" />
                                        Mission Protocol
                                    </div>
                                    <p className="text-[12px] md:text-[13px] text-white/80 font-light leading-relaxed text-left m-0 line-clamp-4">
                                        {storyData.summary.p2}
                                    </p>
                                </div>
                            </motion.div>

                            {/* P3 Alert Panel - High Threat style */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(127, 29, 29, 0.15)" }}
                                onHoverStart={() => hover()}
                                onClick={() => {
                                    click();
                                    modalOpen();
                                    setStoryDetail({
                                        title: "Threat Status: Critical",
                                        label: "// SYSTEM_WARNING",
                                        content: storyData.summary.p3
                                    });
                                }}
                                className="p-5 glass-panel border border-white/20 border-l-2 border-l-red-500/60 bg-black/80 relative group overflow-hidden flex flex-col justify-center dynamic-shadow cursor-pointer"
                            >
                                {/* Warning Glow */}
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-500/5 blur-2xl rounded-full" />

                                <div className="absolute top-2 right-3 flex items-center gap-2">
                                    <span className="text-[6px] font-mono text-red-500/0 group-hover:text-red-500/40 transition-all duration-300 tracking-widest uppercase">Alerte</span>
                                    <Activity size={14} className="text-red-500 opacity-20 group-hover:opacity-60 animate-pulse" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-[9px] font-mono text-red-500/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                                        Threat Status: Critical
                                    </div>
                                    <p className="text-[11px] md:text-[12px] text-red-200/60 font-mono leading-relaxed text-left m-0 line-clamp-4">
                                        {storyData.summary.p3}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ===== MASTER: COMPACT "FICHE" GRID ===== */}
                <div className="w-full max-w-6xl mx-auto mt-2">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-1">
                        <Terminal size={12} className="text-teal-accent" />
                        <span className="text-[9px] font-mono text-teal-accent/80 uppercase tracking-[0.3em]">
                            CHRONOLOGIE IS-BE
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {storyData.acts.map((act, i) => {
                            const { color, label, icon: Icon, media, type } = getActTheme(i);
                            const actTitle = act.title.split(':')[1]?.trim() || act.title;

                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onHoverStart={() => hover()}
                                    onClick={() => openModal(i)}
                                    className={`relative flex flex-col w-full h-32 md:h-36 group cursor-pointer rounded-none overflow-hidden border border-white/10 bg-black/70 hover:bg-black/90 hover:border-[${color}]/[0.5] transition-all duration-500 dynamic-shadow`}
                                >
                                    {/* Geometric Corners */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: color }} />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: color }} />

                                    {/* Media Layer (Background) */}
                                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                                        {type === 'video' ? (
                                            <video src={media} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter group-hover:grayscale-0" muted loop playsInline onMouseEnter={(e) => e.currentTarget.play().catch(() => { })} onMouseLeave={(e) => e.currentTarget.pause()} />
                                        ) : (
                                            <img src={media} alt={actTitle} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                                        )}
                                    </div>

                                    {/* Dark Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-[#010203]/70 to-transparent opacity-90 group-hover:opacity-[0.80] transition-opacity duration-500 z-10 pointer-events-none" />

                                    {/* Content Layer (Animated Icon) */}
                                    <div className="absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 shrink-0">
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 border transition-all duration-700 group-hover:rotate-180" style={{ borderColor: `${color}40`, borderTopColor: `${color}80` }} />
                                        <div className="absolute inset-1 border transition-all duration-700 group-hover:-rotate-90" style={{ borderColor: `${color}20`, borderBottomColor: `${color}60` }} />
                                        <Icon size={14} className="relative z-10 transition-transform duration-500 group-hover:scale-110" style={{ color }} />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end z-20 pointer-events-none">
                                        <div className="transform transition-all duration-500 flex flex-col items-start w-full">
                                            <div className="flex justify-between items-center w-full mb-1">
                                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-80 drop-shadow-md" style={{ color }}>
                                                    {label} {"//"} 0{i + 1}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-light uppercase text-white/90 group-hover:text-white tracking-widest leading-none transition-colors duration-300 border-l-2 pl-2" style={{ borderColor: color }}>
                                                {actTitle}
                                            </h3>
                                            <div className="h-px w-full mt-3" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ===== DETAILED OVERLAY MODAL ===== */}
            <AnimatePresence>
                {activeModal !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
                    >
                        {/* Global HUD Layer for Modal */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1400px] max-h-[90vh] md:max-h-[75vh] bg-black/60 backdrop-blur-3xl border rounded-sm overflow-hidden flex flex-col md:flex-row relative cursor-default"
                            style={{
                                borderColor: `${getActTheme(activeModal).color}33`,
                                boxShadow: `calc(var(--mx) * -15px) calc(var(--my) * -15px) 60px rgba(0,0,0,0.8), inset 0 0 40px ${getActTheme(activeModal).color}10`
                            }}
                        >
                            {/* Visual Interface Column - 60% */}
                            <div className="w-full md:w-[60%] relative flex flex-col bg-[#050608] border-r" style={{ borderColor: `${getActTheme(activeModal).color}10` }}>
                                {/* Upper Interface Bar */}
                                <div className="h-10 border-b flex items-center justify-between px-6 bg-black/40" style={{ borderColor: `${getActTheme(activeModal).color}15` }}>
                                    <div className="flex items-center gap-4">
                                        <Activity size={12} className="animate-pulse" style={{ color: getActTheme(activeModal).color, opacity: 0.7 }} />
                                        <span className="text-[8px] font-mono uppercase tracking-[0.4em]" style={{ color: getActTheme(activeModal).color, opacity: 0.6 }}>ENREGISTREMENT // ACT_0{activeModal + 1}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="text-[7px] font-mono text-white/20 mr-4">SYNC_STATUS: ACTIVE</span>
                                        <div className="w-1 h-1" style={{ backgroundColor: getActTheme(activeModal).color, opacity: 0.2 }} />
                                        <div className="w-1 h-1" style={{ backgroundColor: getActTheme(activeModal).color, opacity: 0.5 }} />
                                    </div>
                                </div>

                                {/* Main Media Viewer */}
                                <div className="flex-1 relative flex items-center justify-center p-4 min-h-[30vh] md:min-h-0 bg-gradient-to-b from-black to-[#080a0c] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeModal}
                                            initial={{ opacity: 0, filter: "brightness(2) blur(10px)" }}
                                            animate={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full relative z-10"
                                        >
                                            {getActTheme(activeModal).type === 'video' ? (
                                                <video
                                                    src={getActTheme(activeModal).media}
                                                    autoPlay loop playsInline
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                            ) : (
                                                <img
                                                    src={getActTheme(activeModal).media}
                                                    className="w-full h-full object-cover opacity-80"
                                                    alt={storyData.acts[activeModal].title}
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Viewport UI Overlays */}
                                    <div className="absolute inset-0 pointer-events-none z-20">
                                        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: `${getActTheme(activeModal).color}4d` }} />
                                        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r" style={{ borderColor: `${getActTheme(activeModal).color}4d` }} />
                                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l" style={{ borderColor: `${getActTheme(activeModal).color}4d` }} />
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: `${getActTheme(activeModal).color}4d` }} />

                                        <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 border-l" style={{ color: `${getActTheme(activeModal).color}cc`, backgroundColor: `${getActTheme(activeModal).color}0a`, borderColor: getActTheme(activeModal).color }}>
                                                VISUAL_DATA // {storyData.acts[activeModal].title.split(':')[0]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 w-full h-[2px] bg-white/5 opacity-20 blur-[1px] animate-scan-vertical pointer-events-none z-30" />
                                </div>
                            </div>

                            {/* Intelligence Report Column - 40% */}
                            <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col gap-8 overflow-y-auto custom-scrollbar relative bg-[#010203]">
                                {/* Close button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors z-50 p-2"
                                >
                                    <X size={24} strokeWidth={1.5} />
                                </button>

                                {/* Header Section */}
                                <div className="space-y-4 relative z-10">
                                    <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: getActTheme(activeModal).color }} />

                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 relative z-10">
                                        <div className="h-px w-6" style={{ backgroundColor: `${getActTheme(activeModal).color}66` }} />
                                        <span className="text-[9px] font-mono uppercase tracking-[0.5em] leading-none translate-y-[1px]" style={{ color: `${getActTheme(activeModal).color}99` }}>
                                            DÉCHIFFREMENT_HISTORIQUE
                                        </span>
                                    </motion.div>

                                    <div className="space-y-1 relative z-10">
                                        <motion.h2
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="text-4xl md:text-5xl font-light uppercase tracking-tighter text-white leading-[0.9]"
                                            style={{ textShadow: `0 0 40px ${getActTheme(activeModal).color}26` }}
                                        >
                                            {storyData.acts[activeModal].title.split(':')[1]?.trim() || storyData.acts[activeModal].title}
                                        </motion.h2>
                                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-3 pt-4">
                                            <div className="px-2 py-1 border rounded-sm flex items-center justify-center" style={{ backgroundColor: `${getActTheme(activeModal).color}1a`, borderColor: `${getActTheme(activeModal).color}33` }}>
                                                <span className="text-[10px] font-mono uppercase tracking-widest font-medium leading-none translate-y-[1px]" style={{ color: getActTheme(activeModal).color }}>ARCHIVE_{2026 - activeModal}</span>
                                            </div>
                                            <div className="h-[1px] flex-1" style={{ backgroundImage: `linear-gradient(to right, ${getActTheme(activeModal).color}66, transparent)` }} />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Content Sections */}
                                <div className="flex flex-col gap-8">
                                    <div className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed font-light text-[14px]">
                                        {storyData.acts[activeModal].content.split('. ').map((sentence, i) => {
                                            if (!sentence.trim()) return null;
                                            return <p key={i} className="mb-4">{sentence}{sentence.endsWith('.') ? '' : '.'}</p>;
                                        })}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 opacity-30">
                                            <Fingerprint size={12} style={{ color: getActTheme(activeModal).color }} />
                                            <h4 className="text-[9px] font-medium tracking-[0.3em] uppercase text-white">DIRECTIVES_IA</h4>
                                        </div>

                                        <div className="space-y-3">
                                            {storyData.acts[activeModal].prompts.map((prompt, i) => (
                                                <div key={i} className="p-3 border rounded-sm relative overflow-hidden group/prompt" style={{ backgroundColor: `${getActTheme(activeModal).color}05`, borderColor: `${getActTheme(activeModal).color}0d` }}>
                                                    <div className="absolute top-0 left-0 w-0.5 h-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: getActTheme(activeModal).color }} />
                                                    <p className="text-[10px] font-mono text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-wider leading-relaxed pr-8">
                                                        {prompt}
                                                    </p>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(prompt)}
                                                        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5 rounded-sm"
                                                        style={{ color: getActTheme(activeModal).color }}
                                                    >
                                                        <Copy size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Footer */}
                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-20">
                                    <span className="text-[7px] font-mono tracking-widest uppercase text-white/50">LEVEL: OMEGA-4 // TS: CLASSIFIED</span>
                                    <span className="text-[7px] font-mono tracking-[0.6em] uppercase" style={{ color: getActTheme(activeModal).color }}>STABLE</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* ===== STORY DETAIL MODAL (TRANSPARENT) ===== */}
            <AnimatePresence>
                {storyDetail !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { modalClose(); setStoryDetail(null); }}
                        className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-black/80 backdrop-blur-3xl border border-teal-accent/50 rounded-sm p-8 md:p-12 relative cursor-default dynamic-shadow-lg"
                        >
                            <button
                                onClick={() => { modalClose(); setStoryDetail(null); }}
                                className="absolute top-6 right-6 text-white/20 hover:text-teal-accent transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-teal-accent/50" />
                                    <span className="text-[10px] font-mono text-teal-accent uppercase tracking-[0.5em]">{storyDetail.label}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter text-white">
                                    {storyDetail.title}
                                </h2>

                                <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-white/80 font-light leading-relaxed text-lg">
                                        {storyDetail.content}
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                        End of Log // Level 4 Clearance
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
