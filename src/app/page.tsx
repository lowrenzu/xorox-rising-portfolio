"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold sections to prioritize Hero video loading
const CharacterGallery = dynamic(() => import("@/components/CharacterGallery"), { ssr: false });
const StorySection = dynamic(() => import("@/components/StorySection"), { ssr: false });
const MediaLibrary = dynamic(() => import("@/components/MediaLibrary"), { ssr: false });
const CreationSection = dynamic(() => import("@/components/CreationSection"), { ssr: false });

// Cinematic smooth scroll — easeInOutExpo
function smoothScrollTo(targetY: number, duration = 1200) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const ease = (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * --t));
  };
  const step = (now: number) => {
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const SECTION_IDS = ["", "factions", "story", "creation", "media"];

export default function Home() {
  const isSnapping = useRef(false);

  // Section-snap wheel: only triggers at top/bottom edge of each section
  useEffect(() => {
    const getSectionTops = () =>
      SECTION_IDS.map((id) =>
        id === "" ? 0 : (document.getElementById(id)?.offsetTop ?? 0)
      );

    const EDGE_THRESHOLD = 20; // Lower threshold to avoid accidental snaps while reading section content

    const handleWheel = (e: WheelEvent) => {
      // While snapping is active, block scroll entirely
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      const tops = getSectionTops();
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const pageH = document.body.scrollHeight;
      const dir = e.deltaY > 0 ? 1 : -1;

      // Find current section index
      let currentIdx = 0;
      for (let i = tops.length - 1; i >= 0; i--) {
        if (scrollY >= tops[i] - 10) { currentIdx = i; break; }
      }

      // Section boundaries
      const sectionTop = tops[currentIdx];
      const sectionBottom = currentIdx < tops.length - 1
        ? tops[currentIdx + 1]
        : pageH;

      const atTopEdge = scrollY <= sectionTop + EDGE_THRESHOLD;
      const atBottomEdge = scrollY + viewportH >= sectionBottom - EDGE_THRESHOLD;

      // Snap only when approaching a section boundary in the scroll direction
      const shouldSnap = (dir === -1 && atTopEdge) || (dir === 1 && atBottomEdge);

      if (!shouldSnap) return; // let natural scroll happen inside the section

      const nextIdx = Math.max(0, Math.min(tops.length - 1, currentIdx + dir));
      if (nextIdx === currentIdx) return;

      e.preventDefault();
      isSnapping.current = true;
      smoothScrollTo(tops[nextIdx], 1200);
      setTimeout(() => { isSnapping.current = false; }, 1350);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main className="min-h-screen bg-background relative selection:bg-teal-accent/30 selection:text-white scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Character Gallery Section */}
      <motion.section
        id="factions"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="min-h-screen py-24 border-t border-glass-border relative"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-accent/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <CharacterGallery />
        </div>
      </motion.section>

      <motion.div
        id="story"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <StorySection />
      </motion.div>

      <motion.div
        id="creation"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <CreationSection />
      </motion.div>

      <motion.div
        id="media"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <MediaLibrary />
      </motion.div>


    </main>
  );
}
