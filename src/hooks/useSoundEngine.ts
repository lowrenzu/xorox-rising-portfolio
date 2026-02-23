"use client";

import { useCallback, useRef, useEffect } from "react";

// Global singleton AudioContext
let globalAudioContext: AudioContext | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;
let isSoundEnabled = false;

function getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!globalAudioContext) {
        globalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return globalAudioContext;
}

// ─── Sound Generators ───────────────────────────────────────────────────────

function playTone(
    freq: number,
    duration: number,
    type: OscillatorType = "sine",
    volume = 0.15,
    freqEnd?: number,
    delay = 0
) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    if (freqEnd !== undefined) {
        osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + delay + duration);
    }

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.01);
}

function playNoise(duration: number, volume = 0.03, lowFreq = 800, highFreq = 1200) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = (lowFreq + highFreq) / 2;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    source.stop(ctx.currentTime + duration);
}

// ─── Named Sound Effects ─────────────────────────────────────────────────────

export const Sounds = {
    /** Short digital click for buttons & card clicks */
    click() {
        playTone(1200, 0.04, "square", 0.12);
        playTone(800, 0.06, "square", 0.06, undefined, 0.03);
        playNoise(0.03, 0.04, 1500, 3000);
    },

    /** Ultra-subtle hover beep */
    hover() {
        playTone(900, 0.05, "sine", 0.04, 1100);
    },

    /** Modal opening — ascending sweep */
    modalOpen() {
        playTone(400, 0.15, "sine", 0.1, 900);
        playTone(600, 0.12, "triangle", 0.07, 1200, 0.05);
        playNoise(0.08, 0.025, 1000, 2000);
    },

    /** Modal closing — descending sweep */
    modalClose() {
        playTone(800, 0.12, "sine", 0.08, 300);
        playNoise(0.06, 0.015, 800, 1500);
    },

    /** Section snap-scroll transition — low whoosh */
    sectionTransition() {
        playTone(150, 0.25, "sine", 0.08, 80);
        playTone(300, 0.2, "square", 0.04, 200, 0.05);
        playNoise(0.15, 0.015, 200, 600);
    },

    /** Ambient drone — called separately, loops */
    startAmbient() {
        const ctx = getAudioContext();
        if (!ctx) return;
        stopAmbient();

        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const data = buffer.getChannelData(ch);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.03;
            }
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 200;

        const droneOsc1 = ctx.createOscillator();
        droneOsc1.type = "sine";
        droneOsc1.frequency.setValueAtTime(55, ctx.currentTime);

        const droneOsc2 = ctx.createOscillator();
        droneOsc2.type = "sine";
        droneOsc2.frequency.setValueAtTime(57.5, ctx.currentTime);

        ambientGain = ctx.createGain();
        ambientGain.gain.setValueAtTime(0, ctx.currentTime);
        ambientGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);

        noise.connect(lowpass);
        lowpass.connect(ambientGain);
        droneOsc1.connect(ambientGain);
        droneOsc2.connect(ambientGain);
        ambientGain.connect(ctx.destination);

        noise.start();
        droneOsc1.start();
        droneOsc2.start();

        ambientSource = noise;
    },

    stopAmbient,
};

function stopAmbient() {
    if (ambientGain && globalAudioContext) {
        ambientGain.gain.linearRampToValueAtTime(0, globalAudioContext.currentTime + 1);
    }
    setTimeout(() => {
        try { ambientSource?.stop(); } catch { }
        ambientSource = null;
    }, 1100);
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

export function setSoundEnabled(enabled: boolean) {
    isSoundEnabled = enabled;
    if (enabled) {
        const ctx = getAudioContext();
        if (ctx?.state === "suspended") ctx.resume();
        Sounds.startAmbient();
    } else {
        Sounds.stopAmbient();
    }
}

export function getSoundEnabled() {
    return isSoundEnabled;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSoundEngine() {
    // Unlock AudioContext on first user gesture (browser autoplay policy)
    useEffect(() => {
        const unlock = () => {
            const ctx = getAudioContext();
            if (ctx?.state === "suspended") ctx.resume();
            document.removeEventListener("click", unlock);
            document.removeEventListener("keydown", unlock);
        };
        document.addEventListener("click", unlock);
        document.addEventListener("keydown", unlock);
        return () => {
            document.removeEventListener("click", unlock);
            document.removeEventListener("keydown", unlock);
        };
    }, []);

    return {
        click: useCallback(() => Sounds.click(), []),
        hover: useCallback(() => Sounds.hover(), []),
        modalOpen: useCallback(() => Sounds.modalOpen(), []),
        modalClose: useCallback(() => Sounds.modalClose(), []),
        sectionTransition: useCallback(() => Sounds.sectionTransition(), []),
    };
}
