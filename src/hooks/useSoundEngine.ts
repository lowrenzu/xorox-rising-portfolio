"use client";

import { useCallback } from "react";

// Global singleton AudioContext placeholders
const isSoundEnabled = false;

// ─── Named Sound Effects ─────────────────────────────────────────────────────

export const Sounds = {
    click() { if (isSoundEnabled) { /* disabled */ } },
    hover() { if (isSoundEnabled) { /* disabled */ } },
    modalOpen() { if (isSoundEnabled) { /* disabled */ } },
    modalClose() { if (isSoundEnabled) { /* disabled */ } },
    sectionTransition() { if (isSoundEnabled) { /* disabled */ } },
    startAmbient() { if (isSoundEnabled) { /* disabled */ } },
    stopAmbient() { if (isSoundEnabled) { /* disabled */ } },
};

// ─── Toggle ──────────────────────────────────────────────────────────────────

export function setSoundEnabled(enabled: boolean) {
    // Sound engine is currently a placeholder
    if (enabled) { /* disabled */ }
}

export function getSoundEnabled() {
    return false;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSoundEngine() {
    return {
        click: useCallback(() => { }, []),
        hover: useCallback(() => { }, []),
        modalOpen: useCallback(() => { }, []),
        modalClose: useCallback(() => { }, []),
        sectionTransition: useCallback(() => { }, []),
    };
}
