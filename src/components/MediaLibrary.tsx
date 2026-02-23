"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { mediaFiles, sceneBrowserData } from "@/data/filmData";
import SectionHeader from "./SectionHeader";

interface MediaItem {
    src: string;
    type: string;
    isScene: boolean;
    title: string;
    desc?: string;
}

// Combine media and scenes for a richer dataset
const allMedia: MediaItem[] = [
    ...sceneBrowserData.map(s => ({ src: `/assets/Scenes_action/${s.media.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`, type: s.type, isScene: true, title: s.title, desc: s.desc })),
    ...mediaFiles.reduce((acc: MediaItem[], m) => {
        // Avoid duplicates if a media file is also a scene
        const fileName = m.type === 'image' ? m.name.replace(/\.(png|jpg|jpeg)$/i, '.webp') : m.name;
        if (!sceneBrowserData.find(s => s.media === m.name)) {
            acc.push({ src: `/assets/Scenes_action/${fileName}`, type: m.type, isScene: false, title: fileName.replace(/\.[^/.]+$/, "").replace(/_/g, ' ') });
        }
        return acc;
    }, [])
];

export default function MediaLibrary() {
    const [filter, setFilter] = useState<"all" | "image" | "video">("all");
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

    const filteredMedia = allMedia.filter(m => filter === "all" || m.type === filter);
    return (
        <section className="min-h-screen py-24 bg-[#020305] relative border-t border-glass-border">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-accent/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <SectionHeader
                    title="Médiathèque"
                    label="// ARCHIVES CLASSIFIÉES"
                    description="Archives visuelles de l'opération Artefact — enregistrements vidéo et photogrammes de terrain."
                    alignment="center"
                />

                <div className="text-center mb-10 -mt-10 w-full overflow-hidden">
                    {/* HUD-style horizontal filter */}
                    <div className="flex items-center justify-start sm:justify-center mt-5 gap-1 overflow-x-auto pb-4 custom-scrollbar px-4 sm:px-0 whitespace-nowrap">
                        {(["all", "image", "video"] as const).map((f, i) => {
                            const isActive = filter === f;
                            const label = f === 'all' ? 'Tout' : f === 'image' ? 'Images' : 'Vidéos';
                            return (
                                <React.Fragment key={f}>
                                    <motion.button
                                        onClick={() => setFilter(f)}
                                        className="group flex items-center gap-2 px-3 py-2 cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <div className="relative w-2 h-2 flex items-center justify-center">
                                            <motion.div
                                                className="rounded-full"
                                                animate={isActive
                                                    ? { width: 6, height: 6, backgroundColor: "#25d1f4", boxShadow: "0 0 8px #25d1f4" }
                                                    : { width: 4, height: 4, backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "none" }
                                                }
                                                whileHover={{ scale: 1.5, backgroundColor: "#25d1f4" }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                            {isActive && <div className="absolute inset-0 rounded-full border border-teal-accent/40 animate-ping" />}
                                        </div>
                                        <div className="relative flex flex-col items-center justify-center">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌜</span>
                                                <span
                                                    className={`text-[9px] font-mono uppercase tracking-[0.25em] transition-colors duration-200 z-10 ${isActive ? "text-teal-accent drop-shadow-[0_0_8px_rgba(37,209,244,0.8)]" : "text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(37,209,244,0.5)]"}`}
                                                >
                                                    {label}
                                                </span>
                                                <span className={`text-teal-accent text-[10px] font-mono font-normal transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>⌟</span>
                                            </div>
                                            <div className={`absolute -bottom-1.5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-accent to-transparent transition-all duration-300 origin-center pointer-events-none ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`} />
                                        </div>
                                    </motion.button>
                                    {i < 2 && <div className="w-px h-3 bg-white/10" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Media Grid */}
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                    <AnimatePresence>
                        {filteredMedia.map((media) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={media.src}
                                className="relative group cursor-pointer break-inside-avoid rounded-none overflow-hidden border border-white/5 bg-[#020304] hover:bg-[#030608] hover:border-teal-accent/30 transition-all duration-500 mb-6"
                                onClick={() => setSelectedMedia(media)}
                                onMouseEnter={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) video.play().catch(() => { });
                                }}
                                onMouseLeave={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) video.pause();
                                }}
                            >
                                {/* Geometric Corners */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

                                {media.type === "video" ? (
                                    <div className="relative">
                                        <video
                                            src={media.src}
                                            className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter group-hover:grayscale-0"
                                            muted loop playsInline
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={media.src}
                                        alt={media.title}
                                        className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // transparent 1x1 fallback
                                        }}
                                    />
                                )}

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-[#010203]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                                {/* Content Layer */}
                                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end z-20 pointer-events-none">
                                    <div className="transform transition-all duration-500 flex flex-col items-start w-full">
                                        <div className="flex justify-between items-center w-full mb-2">
                                            <span className="text-teal-accent text-[9px] tracking-widest font-mono uppercase">
                                                {media.isScene ? "SÉQUENCE" : "ARCHIVE"} {"//"} {media.type}
                                            </span>
                                            <Maximize2 size={14} className="text-teal-accent opacity-50 transition-opacity" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-light uppercase text-white/90 group-hover:text-white mb-2 tracking-widest leading-none transition-colors duration-300 border-l border-teal-accent/50 pl-2">
                                            {media.title}
                                        </h3>
                                        <div className="h-px w-full bg-gradient-to-r from-teal-accent/50 to-transparent mt-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white z-50 transition-colors"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-7xl max-h-full flex flex-col items-center">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] bg-black flex items-center justify-center">
                                {selectedMedia.type === "video" ? (
                                    <video src={selectedMedia.src} className="w-full h-full object-contain" controls autoPlay />
                                ) : (
                                    <img src={selectedMedia.src} alt={selectedMedia.title} className="w-full h-full object-contain" />
                                )}
                            </div>

                            <div className="w-full mt-6 text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-light uppercase text-teal-accent mb-2">
                                    {selectedMedia.title}
                                </h3>
                                {selectedMedia.desc && (
                                    <p className="text-white/70 max-w-2xl text-xs md:text-sm leading-relaxed">
                                        {selectedMedia.desc}
                                    </p>
                                )}
                                <div className="text-white/30 font-mono text-[10px] tracking-widest uppercase mt-4">
                                    SRC: {selectedMedia.src}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
