"use client";

import { useEffect } from "react";

export default function MouseTracker() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate relative position from center (-1 to 1)
            const mx = (e.clientX / window.innerWidth) * 2 - 1;
            const my = (e.clientY / window.innerHeight) * 2 - 1;

            // Set CSS variables on document root
            document.documentElement.style.setProperty("--mx", mx.toString());
            document.documentElement.style.setProperty("--my", my.toString());
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null; // This component only manages side effects
}
