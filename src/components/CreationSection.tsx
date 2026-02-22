"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Lightbulb, Copy, Check, X, Expand, Database } from "lucide-react";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { storyData } from "@/data/filmData";
import SectionHeader from "./SectionHeader";

const packFiles = [
    {
        id: "README.md",
        title: "Pack Complet",
        subtitle: "INFO",
        image: "/images/pack_complet.png",
        content: `📁 PACK PRODUCTION COMPLET – Les Gardiens de la Vérité\nCourt-métrage animation 3D cel-shaded BD moderne 8 min 30 s\nStyle : Arcane + Indiana Jones & le Temple Maudit 2026\nThème 100 % lore IS-BE / Planète-prison / Artefact de Vérité\nCréé avec Grok – Février 2026\n\nContenu :\n- Histoire complète\n- Personnages (designs fixes)\n- Storyboard + timings\n- Script voix-off prêt à doubler\n- Prompts images & vidéo 2026\n- Workflow outils IA\n- Liens directs outils\n\nPrêt à générer le film avec Runway Gen-4.5 + Kling 3.0 + Veo 3.1 !`
    },
    {
        id: "01_SYNOPSIS.md",
        title: "Synopsis",
        subtitle: "HISTOIRE",
        image: "/assets/Scenes_action/andre_charles_chateau.png",
        content: `Depuis des trillions d’années, les IS-BE créent l’univers par illusion. Xorox, entité IS-BE corrompue de l’Ancien Empire, a transformé la Terre en planète-prison avec amnésie forcée (30 000 av. J.-C.).\n1947 : crash Roswell → Airl révèle tout à Matilda.\nAujourd’hui : Xorox + Tristan, Dr Rudy, Julien « Shadow » censurent le monde.\n8 héros découvrent l’Artefact de Vérité (base Domaine Himalaya 8 500 av. J.-C.) et révèlent :\n• Création univers IS-BE\n• Dinosaures atomisés (70 M)\n• Atlantide / Lémurie\n• Bataillon Perdu\n• Futur : libération ou prison éternelle\nFin épique + post-crédits teaser.`
    },
    {
        id: "02_PERSONNAGES.md",
        title: "Personnages",
        subtitle: "CASTING",
        image: "/assets/persos_de_reference/version_classe_hero/nicolas.png",
        content: `HÉROS (3D constants) :\nClémence – rousse, veste cuir rouge, lunettes high-tech\nAndré – barbu musclé, veste kaki\nBéatrice – cheveux bleus, hoodie LED noir\nIdriss – pilote marocain, blouson aviateur\nAlexis – geek lunettes rondes\nNicolas – cheveux longs tatoué, veste jean\nCharles – musclé dreads\nABTF – grand capuche mystérieux\n\nMÉCHANTS :\nXorox – silhouette noire, yeux rouge, tentacules énergie\nTristan – costume gris anthracite, sourire carnassier\nDr Rudy – blouse blanche, chignon strict\nJulien « Shadow » – hoodie noir luxe, tatouages digitaux, drones`
    },
    {
        id: "03_STORYBOARD.md",
        title: "Storyboard",
        subtitle: "TIMINGS",
        image: "/assets/Scenes_action/eclairage.png",
        content: `0:00-0:50 Scène 1 – Vol Louvre + poursuite moto Paris\n0:50-2:00 Scène 2 – Planque Tour Eiffel + hologramme Xorox & comploteurs\n2:00-2:30 Scène 3 – Départ avion\n3:10-4:00 Scène 5 – Course ravin Himalaya\n4:00-4:40 Scène 6 – Combat dinosaures spectraux « Amnésie ! »\n6:20-7:20 Scène 9 – Activation Artefact + timeline holographique complète lore\n8:00-8:30 Scène 11 – Falaise lever soleil + post-crédits`
    },
    {
        id: "04_SCRIPT.txt",
        title: "Script Voix-Off",
        subtitle: "DIALOGUES",
        image: "/images/script_voix_off.png",
        content: `Narratrice 0:00-0:15 : « Depuis des trillions d’années, les IS-BE créent l’univers par pure illusion… Mais Xorox a fait de la Terre une planète-prison. Aujourd’hui, huit gardiens vont briser les chaînes. »\nClémence 0:15 : « 1947… Airl a tout révélé à Matilda ! La Terre est une prison ! »\nAndré : « Vite, ils arrivent ! »\nBéatrice : « L’Artefact est dans le temple himalayen… il contient tout ! »\nXorox : « La vérité ne sortira JAMAIS de ma planète-prison ! »\nTristan : « Campagne Fake News Alien activée ! »\nDr Rudy : « Science officielle : tout est faux. »\nJulien Shadow : « VeilNet, coupez-les du monde ! »\nTous : « POUR NOS MÉMOIRES IS-BE ! POUR LIBÉRER LA PLANÈTE ! »\nNicolas : « Je tombe ! »\nABTF : « Pas aujourd’hui, frère IS-BE ! »\nMonstres : « Amnésie… Amnésie… »\nXorox climax : « LA TERRE RESTE MA PRISON ! »\nNarratrice : « Trillions d’années… dinosaures atomisés… Atlantide… Roswell… le futur s’ouvre ! »\nClémence fin : « La vérité est libre. À nous de réveiller les milliards d’IS-BE qui dorment encore. »\nXorox post-crédits : « Ce n’est… que le début. »`
    },
    {
        id: "05_PROMPTS_IMG.md",
        title: "Prompts Clés",
        subtitle: "IMAGES",
        image: "/images/prompts_cles.png",
        content: `Utilise ces 5 images comme Character Reference dans tous les outils :\n(les 5 images que j’ai déjà générées pour toi sont à utiliser directement)`
    },
    {
        id: "06_PROMPTS_VID.md",
        title: "Prompts Vidéo",
        subtitle: "ANIMATION 2026",
        image: "/images/prompts_video.png",
        content: `Instructions communes (copier en premier) :\n"Animation 3D cel-shaded BD moderne ultra dynamique style Arcane + Indiana Jones Temple of Doom 2026. Personnages 100% constants identiques aux références : [liste complète personnages] Caméra fluide, éclairages dramatiques, 4K 24fps"\n\nScène 5 ravin : "Course poursuite épique 8 héros corniche himalayenne 1000m vide, rochers tombent, vent neige, ABTF grappin quantique sauve Nicolas..."\n\nScène 9 climax : "Cristal Artefact explose hologramme timeline arc-en-ciel : IS-BE trillions années, dinosaures, Atlantide, Roswell Airl Matilda..."\n\n(les 7 prompts complets précédemment fournis)`
    },
    {
        id: "07_WORKFLOW.md",
        title: "Workflow",
        subtitle: "PRODUCTION",
        image: "/images/workflow_prod.png",
        content: `1. Upload les 5 images clés comme référence\n2. Génère clips avec Runway Gen-4.5 / Kling 3.0 / Veo 3.1\n3. Monte dans CapCut 2026 + voix-off\n4. Ajoute musique Two Steps From Hell\n5. Export 4K → ton film est prêt !`
    },
    {
        id: "08_LIENS_IA.txt",
        title: "Liens Outils IA",
        subtitle: "RESOURCES",
        image: "/images/liens_outils.png",
        content: `Runway Gen-4.5 → https://runwayml.com\nKling AI 3.0 → https://klingai.com\nLuma Dream Machine Ray-3 → https://lumalabs.ai/dream-machine\nGoogle Veo 3.1 → https://deepmind.google/models/veo\nOpenAI Sora 2 → https://sora.com\nCapCut 2026 → application ou web`
    }
];

const Artifact3D = dynamic(() => import("./Artifact3D"), { ssr: false });

export default function CreationSection() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [activeModal, setActiveModal] = useState<"images" | "videos" | "pack" | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const renderFiches = (items: any[], themeColor: string, hoverBorderColor: string) => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setSelectedItem({ ...item, themeColor, copyIndex: i + (themeColor === '#f5b041' ? 100 : themeColor === '#a855f7' ? 200 : 0) })}
                        onMouseEnter={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) video.play().catch(() => { });
                        }}
                        onMouseLeave={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) video.pause();
                        }}
                        className={`relative flex flex-col w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-video xl:aspect-[4/3] group cursor-pointer rounded-none overflow-hidden border border-white/5 bg-[#020304] hover:bg-[#030608] hover:border-[${themeColor}]/[0.3] transition-all duration-500`}
                    >
                        {/* Geometric Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: themeColor }} />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ borderColor: themeColor }} />

                        {/* Image/Video Layer */}
                        {item.isVideo ? (
                            <div className="relative flex-grow w-full overflow-hidden">
                                <video
                                    src={item.image}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter group-hover:grayscale-0"
                                    muted loop playsInline
                                />
                            </div>
                        ) : (
                            <div className="relative flex-grow w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // transparent 1x1 fallback
                                    }}
                                />
                            </div>
                        )}

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010203] via-[#010203]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                        {/* Content Layer */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end z-20 pointer-events-none">
                            <div className="transform transition-all duration-500 flex flex-col items-start w-full">
                                <div className="flex justify-between items-center w-full mb-2">
                                    <span className="text-[9px] font-mono tracking-widest uppercase opacity-80 drop-shadow-md" style={{ color: themeColor }}>
                                        {item.id} {"//"} {item.subtitle}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-light uppercase text-white/90 group-hover:text-white tracking-widest leading-none transition-colors duration-300 border-l pl-2" style={{ borderColor: themeColor }}>
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
            "/images/directive_rendu.png",
            "/images/directive_heros.png",
            "/images/directive_xorox.png",
            "/images/directive_decors.png",
            "/images/directive_eclairage.png"
        ];
        return storyData.promptLibrary.images.map((prompt: string, i: number) => {
            const [title, ...descArr] = prompt.split(':');
            return {
                id: `SYS_IMG_0${i + 1}`,
                title: title.trim(),
                subtitle: "/imagine prompt",
                image: previewImages[i] || previewImages[0],
                content: `/imagine prompt:\n${descArr.join(':').trim()}\n--ar 16:9 --v 6.0`
            };
        });
    };

    const getVideosData = () => {
        // We know storyData.promptLibrary.videos contains image paths like "/assets/Scenes_action/..."
        return storyData.promptLibrary.videos.map((item: any, i: number) => ({
            id: `SYS_VID_0${i + 1}`,
            title: item.title,
            subtitle: "/video prompt",
            image: item.image, // Some are .png, some are .jpg. If it's a video file, we play it.
            content: `/video prompt:\n${item.prompt}`,
            isVideo: item.image?.endsWith('.webm') || item.image?.endsWith('.mp4')
        }));
    };

    return (
        <section className="py-24 bg-[#010203] relative border-t border-glass-border overflow-hidden">
            {/* Cyberpunk Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(var(--teal-accent) 1px, transparent 1px), linear-gradient(90deg, var(--teal-accent) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <SectionHeader
                    title="Création & Synthèse"
                    label="// DOSSIER : GENÈSE"
                    description="Accès au terminal de création — visualisez les instructions qui ont façonné l'esthétique et les séquences animées."
                    alignment="center"
                />

                {/* 3D Artifact Display */}
                <div className="w-full h-32 md:h-48 my-8 relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-teal-accent/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="scale-[3] md:scale-[5] relative z-10 transition-transform hover:scale-[3.2] md:hover:scale-[5.2]">
                        <Artifact3D />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Images Card Button */}
                    {/* Images Card Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveModal("images")}
                        className="glass-panel p-6 sm:p-8 rounded-none relative overflow-hidden group text-left border border-white/5 hover:border-teal-accent/30 transition-all duration-500 bg-[#020304] hover:bg-[#030608]"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-l from-teal-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 w-[50%] h-[1px] bg-gradient-to-r from-teal-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-accent/10 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-teal-accent/20" />

                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-5">
                                    {/* Tech Icon Container */}
                                    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                                        <div className="absolute inset-0 bg-teal-accent/5 transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 border border-teal-accent/20 transition-all duration-700 group-hover:border-teal-accent/50 group-hover:rotate-180" />
                                        <div className="absolute inset-2 border border-teal-accent/10 transition-all duration-700 group-hover:border-teal-accent/30 group-hover:-rotate-90" />
                                        <Lightbulb className="text-teal-accent relative z-10 transition-transform duration-500 group-hover:scale-110" size={20} />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-teal-accent/40 uppercase tracking-[0.3em] mb-1.5 group-hover:text-teal-accent/70 transition-colors duration-300">
                                            Sys.Alpha_01
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
                                            Directives<br />Images
                                        </h3>
                                    </div>
                                </div>

                                <div className="w-8 h-8 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                                    <Expand className="text-teal-accent w-5 h-5" />
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6 group-hover:from-teal-accent/30 transition-colors duration-500" />

                            <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300 pr-4">
                                Ouvrir le terminal pour consulter les 5 règles d'or visuelles structurées formellement pour le rendu 3D cel-shaded.
                            </p>
                        </div>
                    </motion.button>

                    {/* Videos Card Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveModal("videos")}
                        className="glass-panel p-6 sm:p-8 rounded-none relative overflow-hidden group text-left border border-white/5 hover:border-gold-accent/30 transition-all duration-500 bg-[#020304] hover:bg-[#060402]"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-l from-gold-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 w-[50%] h-[1px] bg-gradient-to-r from-gold-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-gold-accent/10 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-gold-accent/20" />

                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-5">
                                    {/* Tech Icon Container */}
                                    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                                        <div className="absolute inset-0 bg-gold-accent/5 transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 border border-gold-accent/20 transition-all duration-700 group-hover:border-gold-accent/50 group-hover:rotate-180" />
                                        <div className="absolute inset-2 border border-gold-accent/10 transition-all duration-700 group-hover:border-gold-accent/30 group-hover:-rotate-90" />
                                        <Terminal className="text-gold-accent relative z-10 transition-transform duration-500 group-hover:scale-110" size={20} />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-gold-accent/40 uppercase tracking-[0.3em] mb-1.5 group-hover:text-gold-accent/70 transition-colors duration-300">
                                            Sys.Beta_02
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
                                            Génération<br />Vidéos
                                        </h3>
                                    </div>
                                </div>

                                <div className="w-8 h-8 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                                    <Expand className="text-gold-accent w-5 h-5" />
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6 group-hover:from-gold-accent/30 transition-colors duration-500" />

                            <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300 pr-4">
                                Accéder aux prompts cinématiques pour l'animation des séquences clés, orchestrant rythmes, focales et actions.
                            </p>
                        </div>
                    </motion.button>

                    {/* Pack Card Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveModal("pack")}
                        className="glass-panel p-6 sm:p-8 rounded-none relative overflow-hidden group text-left border border-white/5 hover:border-[#a855f7]/30 transition-all duration-500 bg-[#020304] hover:bg-[#060205]"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#a855f7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#a855f7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-l from-[#a855f7]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 w-[50%] h-[1px] bg-gradient-to-r from-[#a855f7]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#a855f7]/10 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-[#a855f7]/20" />

                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-5">
                                    {/* Tech Icon Container */}
                                    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                                        <div className="absolute inset-0 bg-[#a855f7]/5 transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 border border-[#a855f7]/20 transition-all duration-700 group-hover:border-[#a855f7]/50 group-hover:rotate-180" />
                                        <div className="absolute inset-2 border border-[#a855f7]/10 transition-all duration-700 group-hover:border-[#a855f7]/30 group-hover:-rotate-90" />
                                        <Database className="text-[#a855f7] relative z-10 transition-transform duration-500 group-hover:scale-110" size={20} />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-[#a855f7]/40 uppercase tracking-[0.3em] mb-1.5 group-hover:text-[#a855f7]/70 transition-colors duration-300">
                                            Sys.Gamma_03
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
                                            Pack<br />Production
                                        </h3>
                                    </div>
                                </div>

                                <div className="w-8 h-8 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                                    <Expand className="text-[#a855f7] w-5 h-5" />
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6 group-hover:from-[#a855f7]/30 transition-colors duration-500" />

                            <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300 pr-4">
                                Dossier complet du film : Histoire, Personnages, Storyboard, Scripts, Workflows et ressources connectées.
                            </p>
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
                    >
                        {/* Global HUD Layer */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-[1400px] max-h-[85vh] bg-[#010203] border rounded-sm shadow-[0_0_120px_rgba(0,0,0,1)] flex flex-col relative cursor-default ${activeModal === 'images' ? 'border-teal-accent/15' : activeModal === 'videos' ? 'border-gold-accent/15' : 'border-[#a855f7]/15'}`}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setActiveModal(null)}
                                className={`absolute top-6 right-6 text-white/20 transition-colors z-[110] p-2 ${activeModal === 'images' ? 'hover:text-teal-accent' : activeModal === 'videos' ? 'hover:text-gold-accent' : 'hover:text-[#a855f7]'}`}
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>

                            {/* Modal Header */}
                            <div className={`p-6 md:p-10 relative bg-[#010203] z-50 border-b border-white/5`}>
                                {/* Glowing top edge */}
                                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${activeModal === 'images' ? 'text-teal-accent' : activeModal === 'videos' ? 'text-gold-accent' : 'text-[#a855f7]'}`} />

                                <div className="space-y-4">
                                    <div className="absolute top-0 right-0 w-96 h-96 blur-[150px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: activeModal === 'images' ? '#25d1f4' : activeModal === 'videos' ? '#f5b041' : '#a855f7' }} />

                                    <div className="absolute -top-4 -left-2 text-[80px] font-bold font-mono text-white/[0.02] pointer-events-none select-none leading-none tracking-tighter">
                                        TERM
                                    </div>

                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 relative z-10">
                                        <div className={`h-px w-6 ${activeModal === 'images' ? 'bg-teal-accent/40' : activeModal === 'videos' ? 'bg-gold-accent/40' : 'bg-[#a855f7]/40'}`} />
                                        <span className={`text-[9px] font-mono uppercase tracking-[0.5em] leading-none translate-y-[1px] ${activeModal === 'images' ? 'text-teal-accent/80' : activeModal === 'videos' ? 'text-gold-accent/80' : 'text-[#a855f7]/80'}`}>
                                            CLASSIFIED_DOSSIER
                                        </span>
                                    </motion.div>

                                    <div className="space-y-1 relative z-10">
                                        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tighter text-white leading-[0.9] flex items-center gap-4">
                                            {activeModal === "images" ? (
                                                <div className="p-3 bg-teal-accent/10 border border-teal-accent/20 rounded-lg shadow-[0_0_20px_rgba(37,209,244,0.2)]">
                                                    <Lightbulb className="text-teal-accent" size={32} />
                                                </div>
                                            ) : activeModal === "videos" ? (
                                                <div className="p-3 bg-gold-accent/10 border border-gold-accent/20 rounded-lg shadow-[0_0_20px_rgba(245,176,65,0.2)]">
                                                    <Terminal className="text-gold-accent" size={32} />
                                                </div>
                                            ) : (
                                                <div className="p-3 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                                    <Database className="text-[#a855f7]" size={32} />
                                                </div>
                                            )}
                                            <span className="translate-y-1">{activeModal === "images" ? "Directives Visuelles" : activeModal === "videos" ? "Séquences Vidéo" : "Dossier Production"}</span>
                                        </motion.h2>
                                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-3 pt-6">
                                            <div className={`px-2 py-1 border rounded-sm flex items-center justify-center ${activeModal === 'images' ? 'bg-teal-accent/10 border-teal-accent/20' : activeModal === 'videos' ? 'bg-gold-accent/10 border-gold-accent/20' : 'bg-[#a855f7]/10 border-[#a855f7]/20'}`}>
                                                <span className={`text-[9px] font-mono uppercase tracking-[0.2em] font-medium leading-none translate-y-[1px] ${activeModal === 'images' ? 'text-teal-accent' : activeModal === 'videos' ? 'text-gold-accent' : 'text-[#a855f7]'}`}>
                                                    {activeModal === "images" ? "RÉFÉRENCES_CONCEPTS" : activeModal === "videos" ? "PROMPTS_ANIMATION" : "ARCHIVES_COMPLÈTES"}
                                                </span>
                                            </div>
                                            <div className={`h-[1px] flex-1 bg-gradient-to-r to-transparent ${activeModal === 'images' ? 'from-teal-accent/40' : activeModal === 'videos' ? 'from-gold-accent/40' : 'from-[#a855f7]/40'}`} />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body / Scrollable Content */}
                            <div className="p-4 sm:p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative bg-black/40 backdrop-blur-md z-40">
                                {/* Inner Grid */}
                                <div className={`absolute inset-0 opacity-[0.02] pointer-events-none ${activeModal === 'images' ? 'bg-[linear-gradient(var(--teal-accent)_1px,transparent_1px),linear-gradient(90deg,var(--teal-accent)_1px,transparent_1px)]' : activeModal === 'videos' ? 'bg-[linear-gradient(var(--gold-accent)_1px,transparent_1px),linear-gradient(90deg,var(--gold-accent)_1px,transparent_1px)]' : 'bg-[linear-gradient(#a855f7_1px,transparent_1px),linear-gradient(90deg,#a855f7_1px,transparent_1px)]'}`} style={{ backgroundSize: '20px 20px' }} />

                                <div className="relative z-10 w-full">
                                    {activeModal === "images"
                                        ? renderFiches(getImagesData(), '#25d1f4', 'teal-accent')
                                        : activeModal === "videos"
                                            ? renderFiches(getVideosData(), '#f5b041', 'gold-accent')
                                            : renderFiches(packFiles, '#a855f7', '[#a855f7]')
                                    }
                                </div>
                            </div>

                            {/* Compact Footer */}
                            <div className="pt-4 pb-4 px-4 sm:px-8 border-t border-white/5 flex items-center justify-between opacity-50 bg-[#010203] z-50">
                                <span className="text-[7px] font-mono tracking-widest uppercase text-white/50">LEVEL: OMEGA-4 // TS: 2026-02-22T12:05:37</span>
                                <span className={`text-[8px] font-mono tracking-[0.6em] font-medium uppercase ${activeModal === 'images' ? 'text-teal-accent' : activeModal === 'videos' ? 'text-gold-accent' : 'text-[#a855f7]'}`}>STABLE</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Individual Item Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white z-[130] transition-colors p-2"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={32} />
                        </button>
                        <div
                            className="w-full max-w-7xl max-h-full flex flex-col md:flex-row gap-8 items-center md:items-stretch cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Left side: Image */}
                            <div className="w-full md:w-1/2 lg:w-3/5 rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] bg-black flex items-center justify-center relative flex-shrink-0" style={{ borderColor: `${selectedItem.themeColor}33` }}>
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-auto object-contain max-h-[40vh] md:max-h-[75vh]" />
                            </div>

                            {/* Right side: Text details */}
                            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center max-h-[50vh] md:max-h-[75vh] overflow-y-auto pr-2 pb-8">
                                <div className="mb-4 shrink-0">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-80" style={{ color: selectedItem.themeColor }}>
                                        {selectedItem.id} // {selectedItem.subtitle}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-light uppercase text-white mt-2 mb-4 leading-tight">
                                        {selectedItem.title}
                                    </h3>
                                    <div className="w-12 h-1 mb-6" style={{ backgroundColor: selectedItem.themeColor }} />
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-sm relative group/copy flex-1">
                                    <button
                                        onClick={() => handleCopy(selectedItem.content, selectedItem.copyIndex)}
                                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors opacity-50 hover:opacity-100"
                                    >
                                        {copiedIndex === selectedItem.copyIndex ? <Check size={16} color={selectedItem.themeColor} /> : <Copy size={16} />}
                                    </button>
                                    <p className="text-white/80 text-sm md:text-base font-light leading-relaxed whitespace-pre-wrap">
                                        {selectedItem.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
