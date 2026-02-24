"use client";

import { useEffect, useState } from "react";

const SECTION_COLORS: Record<string, { c1: string; c2: string; c3: string }> = {
    hero: {
        c1: "rgba(37, 209, 244, 0.4)",  // Teal
        c2: "rgba(168, 85, 247, 0.45)", // Purple
        c3: "rgba(245, 176, 65, 0.4)",  // Gold
    },
    factions: {
        c1: "rgba(30, 58, 138, 0.5)",  // Deeper Blue
        c2: "rgba(37, 209, 244, 0.3)",  // Teal
        c3: "rgba(168, 85, 247, 0.4)",  // Purple
    },
    story: {
        c1: "rgba(168, 85, 247, 0.5)",  // Deeper Purple
        c2: "rgba(239, 68, 68, 0.3)",   // Red hint
        c3: "rgba(37, 209, 244, 0.4)",  // Teal
    },
    creation: {
        c1: "rgba(245, 176, 65, 0.5)",  // Deeper Gold
        c2: "rgba(37, 209, 244, 0.4)",  // Teal
        c3: "rgba(168, 85, 247, 0.3)",  // Purple
    },
    media: {
        c1: "rgba(37, 209, 244, 0.5)",  // Teal
        c2: "rgba(59, 130, 246, 0.4)",  // Blue
        c3: "rgba(245, 176, 65, 0.3)",  // Gold
    },
};

export function useSectionObserver() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -20% 0px",
            threshold: 0.2,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id || "hero";
                    setActiveSection(id);

                    // Update CSS variables
                    const colors = SECTION_COLORS[id] || SECTION_COLORS.hero;
                    const root = document.documentElement;
                    root.style.setProperty("--c1", colors.c1);
                    root.style.setProperty("--c2", colors.c2);
                    root.style.setProperty("--c3", colors.c3);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        // Dynamic IDs from page.tsx
        const sections = ["hero", "factions", "story", "creation", "media"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return activeSection;
}
