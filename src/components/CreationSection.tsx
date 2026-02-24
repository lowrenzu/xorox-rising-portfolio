"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { X, Maximize2, FileText, Layout, Palette, Play, Layers, MessageSquare, Check, Copy, Share2, ExternalLink, Database, Image as ImageIcon, Terminal } from "lucide-react";
import { useState, useRef } from "react";
import { storyData } from "@/data/filmData";
import SectionHeader from "./SectionHeader";
import { useSoundEngine } from "@/hooks/useSoundEngine";
import { creationData } from "@/data/creationData";

interface CreationItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    content: string;
    isVideo?: boolean;
    themeColor?: string;
    copyIndex?: number;
}



export default function CreationSection() {
    const { playSound } = useSoundEngine() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [activeModal, setActiveModal] = useState<"images" | "videos" | "pack" | "genese" | "art" | "casting" | "storyboard" | "scenario" | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue<number>(0);
    const mouseY = useMotionValue<number>(0);

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const parallaxX3 = useTransform(springX, [-0.5, 0.5], [-15, 15]);
    const parallaxY3 = useTransform(springY, [-0.5, 0.5], [-15, 15]);

    const openModal = (type: "images" | "videos" | "pack" | "genese" | "art" | "casting" | "storyboard" | "scenario") => {
        playSound?.("click");
        setActiveModal(type);
    };

    const closeModal = () => {
        playSound?.("click");
        setActiveModal(null);
    };

    const openItem = (item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        playSound?.("hover");
        setSelectedItem(item);
    };

    const closeItem = () => {
        playSound?.("click");
        setSelectedItem(null);
    };

    const hover = () => playSound?.("hover");

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const renderFiches = (items: CreationItem[], themeColor: string) => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        onClick={() => openItem({ ...item, themeColor, copyIndex: i + (themeColor === '#f5b041' ? 100 : themeColor === '#a855f7' ? 200 : 0) })}
                        onHoverStart={() => hover()}
                        className="relative flex flex-col w-full aspect-[4/3] group cursor-pointer rounded-none overflow-hidden border border-white/5 bg-black/70 hover:bg-black/90 transition-all duration-500"
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: themeColor }} />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: themeColor }} />

                        {item.isVideo ? (
                            <div className="relative flex-grow w-full overflow-hidden">
                                <video
                                    src={item.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                    autoPlay muted loop playsInline
                                />
                            </div>
                        ) : (
                            <div className="relative flex-grow w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-[#010203]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end z-20 pointer-events-none">
                            <div className="transform transition-all duration-500 flex flex-col items-start w-full">
                                <span className="text-[9px] font-mono tracking-widest uppercase opacity-80 drop-shadow-md mb-2" style={{ color: themeColor }}>
                                    {item.id} {"//"} {item.subtitle}
                                </span>
                                <h3 className="text-lg font-light uppercase text-white/90 group-hover:text-white tracking-widest leading-none transition-colors duration-300 border-l pl-2" style={{ borderColor: themeColor }}>
                                    {item.title}
                                </h3>
                                <div className="h-px w-full mt-2" style={{ background: `linear-gradient(to right, ${themeColor}, transparent)` }} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    const getImagesData = () => {
        const previewImages = [
            "/images/directive_rendu.webp",
            "/images/directive_heros.webp",
            "/images/directive_xorox.webp",
            "/images/directive_decors.webp",
            "/images/directive_eclairage.webp"
        ];
        return storyData.promptLibrary.images.map((prompt: string, i: number): CreationItem => {
            const [title, ...descArr] = prompt.split(':');
            return {
                id: `SYS_IMG_0${i + 1} `,
                title: title.trim(),
                subtitle: "/imagine prompt",
                image: previewImages[i] || previewImages[0],
                content: `/imagine prompt: \n${descArr.join(':').trim()} \n--ar 16:9 --v 6.0`
            };
        });
    };

    const getVideosData = (): CreationItem[] => {
        return storyData.promptLibrary.videos.map((item, i: number): CreationItem => ({
            id: `SYS_VID_0${i + 1} `,
            title: item.title,
            subtitle: "/video prompt",
            image: item.image,
            content: `/video prompt: \n${item.prompt}`,
            isVideo: item.image?.endsWith('.webm') || item.image?.endsWith('.mp4')
        }));
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen py-24 relative bg-[#010103]/40 flex flex-col justify-center"
        >
            {/* Background removed - cleaner look */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="mb-12">
                    <SectionHeader
                        title="Création & Synthèse"
                        label="// STORYBOARD : SYNTHÈSE"
                        description="Accès au terminal de création — visualisez les instructions qui ont façonné l'esthétique et les séquences animées."
                        alignment="center"
                    />
                </div>

                <div className="relative w-full">


                    {/* Main Interaction Cards - Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-30">
                        {/* Card 1: Dossier Genèse */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal("genese")}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-teal-accent/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-accent z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-accent z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-teal-accent font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">DATA.CORE_01</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-3 bg-teal-accent/10 border border-teal-accent/20 rounded-full group-hover:bg-teal-accent/20 transition-colors"
                                    >
                                        <Database className="text-teal-accent w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Dossier Genèse</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Origines des IS-BE, Roswell 1947 et la Terre comme planète-prison.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-teal-accent tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>ACCESS_CORE</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>

                        {/* Card 2: Direction Artistique */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal("art")}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-amber-400/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-400 z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-400 z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-amber-400 font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">VISUAL.ALPHA_02</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-full group-hover:bg-amber-400/20 transition-colors"
                                    >
                                        <ImageIcon className="text-amber-400 w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Direction Art</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Style 3D Cel-shaded, lignes BD dynamiques et esthétique premium 2026.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>VIEW_RENDER</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>

                        {/* Card 3: Casting IS-BE */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal('storyboard')}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-emerald-400/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-400 z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-400 z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-emerald-400 font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">STORY.BETA_03</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-3 bg-emerald-400/10 border border-emerald-400/20 rounded-full group-hover:bg-emerald-400/20 transition-colors"
                                    >
                                        <ImageIcon className="text-emerald-400 w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Storyboard</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Découpage intégral des séquences et narration visuelle du film.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>OPEN_STORY</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>

                        {/* Card 4: Storyboard 20 Plans */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal("storyboard")}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-blue-400/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400 z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-blue-400 font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">SEQ.BETA_04</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ x: [-2, 2, -2] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="p-3 bg-blue-400/10 border border-blue-400/20 rounded-full group-hover:bg-blue-400/20 transition-colors"
                                    >
                                        <FileText className="text-blue-400 w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Plans Clés 20</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Découpage intégral des 20 plans clés, de l&apos;Himalaya au combat final.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>LOAD_FRAMES</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>

                        {/* Card 5: Séquences Scénario */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal("scenario")}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-red-400/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-400 z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-400 z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-red-400 font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">SCR.GAMMA_05</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-3 bg-red-400/10 border border-red-400/20 rounded-full group-hover:bg-red-400/20 transition-colors"
                                    >
                                        <Terminal className="text-red-400 w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Séquences Script</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Développement complet des 3 actes pour une immersion multimodale.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>EXEC_SCRIPT</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>

                        {/* Card 6: Pack Production */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => hover()}
                            onClick={() => openModal('pack')}
                            className="bg-[#0a0a0c] p-6 md:p-8 rounded-none relative overflow-hidden group text-left border border-purple-400/20 transition-all duration-500 dynamic-shadow-lg w-full"
                        >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-400 z-20" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-400 z-20" />
                            <div className="mb-4">
                                <span className="text-[9px] text-purple-400 font-mono tracking-[0.2em] uppercase block mb-2 opacity-50">SYS.OMN_06</span>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="p-3 bg-purple-400/10 border border-purple-400/20 rounded-full group-hover:bg-purple-400/20 transition-colors"
                                    >
                                        <Share2 className="text-purple-400 w-5 h-5" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-light uppercase text-white tracking-[0.1em]">Terminal Prod</h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6">Workflow IA 2026 complet : outils, prompts vidéo et liens directs.</p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                <span>READY_ALL</span>
                                <Share2 size={10} />
                            </div>
                        </motion.button>
                    </div>

                    {/* Bottom Technical Widget - Parallax 3 */}
                    <motion.div
                        style={{ x: parallaxX3, y: parallaxY3 }}
                        className="mt-12 flex justify-center z-10 pointer-events-none hidden md:flex"
                    >
                        <div className="flex gap-8 border-t border-white/5 pt-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-mono text-teal-accent/60 uppercase">Node Hierarchy</span>
                                <div className="flex items-center gap-2">
                                    <Database size={10} className="text-teal-accent" />
                                    <span className="text-[8px] font-mono text-white/40">DB_CONNECTION: SECURE</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <span className="text-[9px] font-mono text-gold-accent/60 uppercase">System Status</span>
                                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Operation: Ready</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Modals remain similarly structured but refined */}
            {/* ===== CATEGORY LEVEL MODAL (TRANSPARENT HUD STYLE) ===== */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
                    >
                        {/* Global HUD Layer for Modal */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1400px] max-h-[90vh] md:max-h-[85vh] bg-[#08080a] backdrop-blur-3xl border-none rounded-none overflow-hidden flex flex-col md:flex-row relative cursor-default shadow-2xl"
                            style={{
                                borderColor: `${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'}11`,
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                boxShadow: `0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 40px ${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'}03`
                            }}
                        >
                            {/* Visual Interface Column - 60% */}
                            <div className="w-full md:w-[60%] relative flex flex-col bg-[#050608] border-r-0" style={{ borderRight: `1px solid ${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'}08` }}>
                                {/* Upper Interface Bar */}
                                <div className="h-10 border-b-0 flex items-center justify-between px-6 bg-black/40" style={{ borderBottom: `1px solid ${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'}08` }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: (activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7' }} />
                                        <span className="text-[8px] font-mono uppercase tracking-[0.4em]" style={{ color: (activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7', opacity: 0.6 }}>TERMINAL // {activeModal.toUpperCase()}</span>
                                    </div>
                                    <div className="flex gap-1 opacity-40">
                                        <div className="w-4 h-[1px] bg-white/40" />
                                        <div className="w-1 h-1 bg-white/20" />
                                    </div>
                                </div>

                                {/* Content Grid Viewer */}
                                <div className="flex-1 relative overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-black to-[#080a0c]">
                                    {activeModal === "images" ? renderFiches(getImagesData(), '#2dd4bf') :
                                        activeModal === "videos" ? renderFiches(getVideosData(), '#fbbf24') :
                                            activeModal === "pack" ? renderFiches(creationData.production, '#a855f7') :
                                                activeModal === "genese" ? renderFiches(creationData.genese, '#2dd4bf') :
                                                    activeModal === "art" ? renderFiches(creationData.art, '#fbbf24') :
                                                        activeModal === "storyboard" ? renderFiches(creationData.storyboard, '#10b981') :
                                                            activeModal === "scenario" ? renderFiches(creationData.scenario, '#f43f5e') : null}

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 w-full h-[2px] bg-white/5 opacity-5 blur-[1px] animate-scan-vertical pointer-events-none z-30" />
                                </div>
                            </div>

                            {/* Info Column - 40% */}
                            <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col gap-8 relative bg-[#010203]">
                                <button onClick={closeModal} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors z-50 p-2">
                                    <X size={24} strokeWidth={1.5} />
                                </button>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="h-px w-6" style={{ backgroundColor: `${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'} 66` }} />
                                        <span className="text-[9px] font-mono uppercase tracking-[0.5em] leading-none translate-y-[1px]" style={{ color: (activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7', opacity: 0.6 }}>
                                            FICHE_CREATION
                                        </span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter text-white leading-[0.9]">
                                        {activeModal === "images" ? "Directives Visuelles" :
                                            activeModal === "videos" ? "Séquences Vidéo" :
                                                activeModal === "pack" ? "Dossier Production" :
                                                    activeModal === "genese" ? "Dossier Genèse" :
                                                        activeModal === "art" ? "Direction Artistique" :
                                                            activeModal === "storyboard" ? "Storyboard 20 Plans" :
                                                                activeModal === "scenario" ? "Séquences Script" : "Archive"}
                                    </h2>

                                    <div className="h-px w-full" style={{ backgroundImage: `linear-gradient(to right, ${(activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7'}11, transparent)` }} />
                                </div>

                                <div className="prose prose-invert prose-sm max-w-none text-white/50 leading-relaxed font-light text-[13px]">
                                    {activeModal === "images" && "Bibliothèque de prompts Midjourney utilisés pour générer l'esthétique visuelle du film, du rendu cel-shaded aux environnements complexes."}
                                    {activeModal === "videos" && "Séquences animées de référence et prompts vidéo Runway/Luma capturant l'essence du mouvement et des effets FX."}
                                    {activeModal === "storyboard" && "Découpage technique et artistique des séquences narratives clés, structuré selon le flux émotionnel de l'histoire."}
                                    {activeModal === "scenario" && "Transcription textuelle des trois actes du film, incluant les dialogues et les directives de mise en scène multimodale."}
                                    {activeModal === "genese" && "Documentation sur les origines du projet, l'inspiration historique (Roswell 1947) et le développement du concept IS-BE."}
                                    {activeModal === "art" && "Spécifications techniques de la direction artistique : palette colorimétrique, shaders 3D et styles de contours BD."}
                                    {activeModal === "pack" && "Accès complet aux ressources de production, outils IA utilisés et informations de contact pour les contributeurs."}
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-20">
                                    <span className="text-[7px] font-mono tracking-widest uppercase text-white/50">NODE: CREATIVE_CORE // {activeModal.toUpperCase()}</span>
                                    <span className="text-[7px] font-mono tracking-[0.6em] uppercase" style={{ color: (activeModal === 'images' || activeModal === 'genese' || activeModal === 'storyboard') ? '#2dd4bf' : (activeModal === 'videos' || activeModal === 'art' || activeModal === 'scenario') ? '#fbbf24' : '#a855f7' }}>READY</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== ITEM LEVEL MODAL (TRANSPARENT HUD STYLE) ===== */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={() => closeItem()}
                    >
                        {/* Global HUD Layer for Modal */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[121] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,255,0.06),rgba(0,255,255,0.02),rgba(255,255,0,0.06))] bg-[length:100%_2px,3px_100%]" />

                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1200px] max-h-[85vh] bg-[#08080a] backdrop-blur-3xl border-none rounded-none flex flex-col md:flex-row relative cursor-default overflow-hidden shadow-2xl"
                            style={{
                                borderColor: `${selectedItem.themeColor}11`,
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                boxShadow: `0 0 60px rgba(0, 0, 0, 0.9), inset 0 0 40px ${selectedItem.themeColor}03`
                            }}
                        >
                            {/* Visual Column - 60% */}
                            <div className="w-full md:w-[60%] relative bg-black flex items-center justify-center overflow-hidden border-r-0" style={{ borderRight: `1px solid ${selectedItem.themeColor}08` }}>
                                {selectedItem.isVideo ? (
                                    <video src={selectedItem.image} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <Image
                                        src={selectedItem.image}
                                        alt={selectedItem.title}
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                )}

                                {/* Overlay HUD elements */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l opacity-30" style={{ borderColor: selectedItem.themeColor }} />
                                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r opacity-30" style={{ borderColor: selectedItem.themeColor }} />
                                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l opacity-30" style={{ borderColor: selectedItem.themeColor }} />
                                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r opacity-30" style={{ borderColor: selectedItem.themeColor }} />

                                    <div className="absolute bottom-6 left-6">
                                        <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-1 bg-black/40 border-l-2" style={{ color: selectedItem.themeColor, borderColor: selectedItem.themeColor }}>
                                            DATA_STREAM // {selectedItem.id}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 w-full h-[2px] bg-white/5 opacity-10 animate-scan-vertical pointer-events-none" />
                            </div>

                            {/* Details Column - 40% */}
                            <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col gap-8 relative overflow-y-auto custom-scrollbar bg-[#010203]">
                                <button onClick={closeItem} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors z-50 p-2"><X size={24} /></button>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-6" style={{ backgroundColor: `${selectedItem.themeColor} 66` }} />
                                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] leading-none" style={{ color: selectedItem.themeColor, opacity: 0.8 }}>{selectedItem.subtitle}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter text-white leading-tight">
                                        {selectedItem.title}
                                    </h2>
                                </div>

                                <div className="flex-grow space-y-6">
                                    <div className="p-5 border-none relative overflow-hidden group/copy bg-white/[0.02]" style={{ border: `1px solid ${selectedItem.themeColor}08` }}>
                                        <div className="absolute top-0 left-0 w-[2px] h-full" style={{ backgroundColor: selectedItem.themeColor }} />
                                        <button
                                            onClick={() => handleCopy(selectedItem.content, selectedItem.copyIndex || 0)}
                                            className="absolute top-3 right-3 p-1.5 opacity-20 hover:opacity-100 transition-opacity bg-white/5 rounded-sm"
                                            style={{ color: selectedItem.themeColor }}
                                        >
                                            {copiedIndex === selectedItem.copyIndex ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                        <p className="text-white/70 text-[13px] whitespace-pre-wrap font-light leading-relaxed">
                                            {selectedItem.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-30">
                                    <span className="text-[7px] font-mono tracking-widest uppercase">SYST_LOG // INDEX_{selectedItem.id}</span>
                                    <Share2 size={12} className="opacity-40" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
