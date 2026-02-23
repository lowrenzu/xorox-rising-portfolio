"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal, Users, MapPin, Shield, Zap, Rocket,
    X, Fingerprint, Activity, Clock
} from "lucide-react";
import { storyData } from "@/data/filmData";
import SectionHeader from "./SectionHeader";
import { useSoundEngine } from "@/hooks/useSoundEngine";

// Helper to assign a specific theme and icon to each act
const getActTheme = (index: number) => {
    const themes = [
        { color: "#3b82f6", label: "Héros", icon: Users, media: "/images/Xorox/XOROX_169.jpg", type: "image", desc: "La réunion secrète et le décryptage." },
        { color: "#a855f7", label: "Poursuite", icon: MapPin, media: "/assets/Scenes_action/boat_antartic.webm", type: "video", desc: "Le crash et l'ascension périlleuse." },
        { color: "#f5b041", label: "Découverte", icon: Shield, media: "/assets/Scenes_action/dome_atlantide.png", type: "image", desc: "L'exploration colossale." },
        { color: "#ef4444", label: "Confrontation", icon: Zap, media: "/assets/persos_de_reference/Xorox/XOROX_GOOD.jpg", type: "image", desc: "Le duel contre l'Architecte." },
        { color: "#f5b041", label: "Révélation", icon: Rocket, media: "/images/activation_revelation.jpg", type: "image", desc: "L'activation du Cristal." },
    ];
    return themes[index % themes.length];
};

export default function StorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModal, setActiveModal] = useState<number | null>(null);
    const { click, hover, modalOpen, modalClose } = useSoundEngine();

    const openModal = (i: number) => { click(); modalOpen(); setActiveModal(i); };
    const closeModal = () => { modalClose(); setActiveModal(null); };

    return (
        <section ref={containerRef} id="story" className="relative min-h-screen py-8 flex flex-col justify-center overflow-hidden border-t border-glass-border bg-[#010203]">
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
                        label="// ARCHIVES_ROOT"
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
                        className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto md:mx-0 flex-shrink-0"
                    >
                        <div className="relative w-full aspect-[2/3] rounded-sm border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] group h-full">
                            <img
                                src="/images/REAL_AFFICHE.jpg"
                                alt="XoroX Rising Poster"
                                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-110 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 w-full h-[1px] bg-white/20 opacity-0 group-hover:opacity-50 blur-[1px] animate-scan-vertical pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Right: Text Boxes */}
                    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-between gap-4">
                        {/* P1 Main Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-teal-accent/90 text-[13px] md:text-sm lg:text-base font-light leading-relaxed tracking-wide text-left m-0"
                        >
                            {storyData.summary.p1}
                        </motion.p>

                        {/* P2 Context Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-4 md:p-5 glass-panel border border-white/5 border-l-2 border-l-teal-accent/50 bg-teal-accent/[0.02] flex-grow flex flex-col justify-center relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-30"><Terminal size={14} className="text-teal-accent group-hover:text-teal-accent/80 transition-colors" /></div>
                            <p className="text-[11px] md:text-sm text-white/80 font-light leading-relaxed text-left z-10 m-0">
                                {storyData.summary.p2}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-3 md:p-4 glass-panel border border-white/5 border-l-2 border-l-red-900/50 bg-red-950/10 flex-grow flex flex-col justify-center relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-30"><Activity size={12} className="text-red-500 animate-pulse" /></div>
                            <p className="text-[10px] md:text-xs text-red-100/70 font-mono leading-relaxed text-left z-10 m-0">
                                {storyData.summary.p3}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ===== MASTER: COMPACT "FICHE" GRID ===== */}
                <div className="w-full max-w-6xl mx-auto mt-2">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-1">
                        <Terminal size={12} className="text-teal-accent" />
                        <span className="text-[9px] font-mono text-teal-accent/80 uppercase tracking-[0.3em]">
                            Chronologie Dossier
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
                                    className={`relative flex flex-col w-full h-32 md:h-36 group cursor-pointer rounded-none overflow-hidden border border-white/5 bg-[#020304] hover:bg-[#030608] hover:border-[${color}]/[0.3] transition-all duration-500`}
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
                                            <h3 className="text-sm font-medium uppercase text-white/90 group-hover:text-white tracking-widest leading-none transition-colors duration-300 border-l-2 pl-2" style={{ borderColor: color }}>
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
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
                    >
                        {/* Global HUD Layer for Modal */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1400px] h-[85vh] bg-[#020304] border rounded-sm shadow-[0_0_120px_rgba(0,0,0,1)] flex flex-col relative cursor-default overflow-hidden"
                            style={{ borderColor: `${getActTheme(activeModal).color}25` }}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 text-white/40 transition-colors z-[110] p-2 hover:text-white"
                                style={{ color: getActTheme(activeModal).color }}
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Left Side: Large Media */}
                                <div className="lg:w-1/2 relative h-64 lg:h-full border-b lg:border-b-0 lg:border-r border-white/10 bg-black overflow-hidden group">
                                    {getActTheme(activeModal).type === 'video' ? (
                                        <video
                                            src={getActTheme(activeModal).media}
                                            autoPlay muted loop playsInline
                                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        />
                                    ) : (
                                        <img
                                            src={getActTheme(activeModal).media}
                                            alt={storyData.acts[activeModal].title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020304] via-[#020304]/40 to-transparent opacity-90" />
                                    <div className="absolute inset-0 w-full h-[2px] bg-white/10 opacity-30 blur-[1px] animate-scan-vertical pointer-events-none" />

                                    {/* Overlay Text on Media */}
                                    <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Activity size={14} style={{ color: getActTheme(activeModal).color }} className="animate-pulse" />
                                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: getActTheme(activeModal).color }}>
                                                Enregistrement_Act_0{activeModal + 1}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-light text-white uppercase tracking-widest leading-none drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                            {storyData.acts[activeModal].title.split(':')[0]}
                                        </h2>
                                        <p className="mt-4 text-xs font-mono text-white/70 tracking-widest uppercase border-r-2 pr-4 inline-block" style={{ borderColor: getActTheme(activeModal).color }}>
                                            {getActTheme(activeModal).desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Content & Prompts (Scrollable) */}
                                <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col h-full bg-gradient-to-b from-white/[0.02] to-transparent overflow-y-auto custom-scrollbar relative z-10">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 shrink-0">
                                        <Terminal size={18} style={{ color: getActTheme(activeModal).color }} />
                                        <span className="text-[12px] font-mono uppercase tracking-[0.4em] opacity-90" style={{ color: getActTheme(activeModal).color }}>
                                            Déchiffrement Historique
                                        </span>
                                        <div className="ml-auto flex items-center text-[10px] font-mono text-white/30 gap-2">
                                            <Clock size={12} /> ARCHIVE_{2026 - activeModal}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-6 leading-tight shrink-0 pl-4 border-l-4" style={{ borderColor: getActTheme(activeModal).color }}>
                                        {storyData.acts[activeModal].title.split(':')[1]?.trim() || storyData.acts[activeModal].title}
                                    </h3>

                                    <div className="prose prose-invert prose-sm max-w-none text-white/80 mb-10 leading-relaxed font-light text-[15px] shrink-0">
                                        {storyData.acts[activeModal].content.split('. ').map((sentence, i) => {
                                            if (!sentence.trim()) return null;
                                            return (
                                                <p key={i} className="mb-4">{sentence}{sentence.endsWith('.') ? '' : '.'}</p>
                                            )
                                        })}
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-white/10 shrink-0">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Fingerprint size={16} style={{ color: getActTheme(activeModal).color }} />
                                            <span className="text-[11px] font-mono text-white/50 uppercase tracking-[0.2em]">
                                                Directives de Génération IA
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {storyData.acts[activeModal].prompts.map((prompt, i) => (
                                                <div key={i} className="bg-black/40 border border-white/10 p-4 relative group overflow-hidden transition-colors hover:bg-white/[0.04]">
                                                    <div
                                                        className="absolute top-0 left-0 w-1 h-full opacity-70 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_currentColor]"
                                                        style={{ backgroundColor: getActTheme(activeModal).color, color: getActTheme(activeModal).color }}
                                                    />
                                                    <p className="text-xs font-mono text-white/50 group-hover:text-white/90 transition-colors leading-relaxed pl-3 uppercase tracking-wider">
                                                        {prompt}
                                                    </p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigator.clipboard.writeText(prompt);
                                                        }}
                                                        className="absolute top-2 right-2 p-2 bg-black border border-white/20 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-white/60 hover:text-white hover:border-white/50"
                                                        title="Copier le prompt"
                                                        style={{ color: getActTheme(activeModal).color }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes scanVertical {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1000%); }
                }
                .animate-scan-vertical {
                    animation: scanVertical 8s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.3);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </section>
    );
}
