"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold sections to prioritize Hero video loading
const CharacterGallery = dynamic(() => import("@/components/CharacterGallery"), { ssr: false });
const StorySection = dynamic(() => import("@/components/StorySection"), { ssr: false });
const MediaLibrary = dynamic(() => import("@/components/MediaLibrary"), { ssr: false });
const CreationSection = dynamic(() => import("@/components/CreationSection"), { ssr: false });

import { useSectionObserver } from "@/hooks/useSectionObserver";



export default function Home() {

  // Track active section to update background colors
  useSectionObserver();

  // Scroll-snap logic is now handled by CSS (scroll-snap-type: y mandatory in globals.css)
  useEffect(() => {
    // No-op, CSS snap active
  }, []);

  return (
    <main className="min-h-screen bg-background relative selection:bg-teal-accent/30 selection:text-white scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Animated Gradient Background for following sections */}
      <div className="animated-gradient-bg">
        {/* Character Gallery Section */}
        <motion.section
          id="factions"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen py-24 relative snap-start"
        >
          <div className="max-w-6xl mx-auto px-6">
            <CharacterGallery />
          </div>
        </motion.section>

        <motion.div
          id="story"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="snap-start"
        >
          <StorySection />
        </motion.div>

        <motion.div
          id="creation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="snap-start min-h-screen"
        >
          <CreationSection />
        </motion.div>

        <motion.div
          id="media"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: "some" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="snap-start"
        >
          <MediaLibrary />
        </motion.div>
      </div>


    </main>
  );
}
