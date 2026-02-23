"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 24; // half the previous 46px
const HALF = SIZE / 2;

const faces = [
    { cls: "front", transform: `translateZ(${HALF}px)` },
    { cls: "back", transform: `rotateY(180deg) translateZ(${HALF}px)` },
    { cls: "right", transform: `rotateY(90deg) translateZ(${HALF}px)` },
    { cls: "left", transform: `rotateY(-90deg) translateZ(${HALF}px)` },
    { cls: "top", transform: `rotateX(90deg) translateZ(${HALF}px)` },
    { cls: "bottom", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
];

export default function Artifact3D() {
    const cubeRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        let angle = 0;
        let raf: number;
        const animate = () => {
            angle += hovered ? 1.2 : 0.4; // spin faster on hover
            const tiltX = -10 + Math.sin(angle * 0.008 * Math.PI) * 8;
            if (cubeRef.current) {
                cubeRef.current.style.transform =
                    `rotateY(${angle}deg) rotateX(${tiltX}deg)`;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [hovered]);

    return (
        <>
            {/* Glitch + glow keyframes */}
            <style>{`
                @keyframes artifact-glitch {
                    0%   { transform: translate(0,0) skewX(0deg);    filter: brightness(1) hue-rotate(0deg); }
                    10%  { transform: translate(-1px, 0.5px) skewX(-2deg); filter: brightness(1.2) hue-rotate(15deg); }
                    20%  { transform: translate(1px,-0.5px) skewX(1.5deg);  filter: brightness(1.1) hue-rotate(-10deg); }
                    30%  { transform: translate(-0.5px,1px) skewX(0deg);  filter: brightness(1.3) hue-rotate(5deg); }
                    40%  { transform: translate(0.5px,-1px) skewX(-1deg); filter: brightness(1) hue-rotate(0deg); }
                    50%  { transform: translate(0,0) skewX(1deg);    filter: brightness(1.2) hue-rotate(-15deg); }
                    60%  { transform: translate(-1px,0) skewX(0deg);    filter: brightness(1) hue-rotate(10deg); }
                    70%  { transform: translate(1px,0.5px) skewX(-1.5deg);  filter: brightness(1.1) hue-rotate(-5deg); }
                    80%  { transform: translate(0,-0.5px) skewX(0deg);    filter: brightness(1.05) hue-rotate(0deg); }
                    90%  { transform: translate(-0.5px,0) skewX(1deg);    filter: brightness(1.3) hue-rotate(20deg); }
                    100% { transform: translate(0,0) skewX(0deg);    filter: brightness(1) hue-rotate(0deg); }
                }
                .artifact-hover-glitch {
                    animation: artifact-glitch 0.4s steps(1) infinite;
                    filter: drop-shadow(0 0 8px rgba(255,180,0,0.4)) drop-shadow(0 0 15px rgba(37,209,244,0.2)) !important;
                }
            `}</style>

            <div
                ref={wrapperRef}
                className={hovered ? "artifact-hover-glitch" : ""}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: SIZE,
                    height: SIZE,
                    perspective: `${SIZE * 4}px`,
                    perspectiveOrigin: "center center",
                    flexShrink: 0,
                    cursor: "pointer",
                    filter: hovered
                        ? undefined // handled by CSS class
                        : "drop-shadow(0 0 3px rgba(255,160,0,0.3))",
                    transition: "filter 0.3s",
                }}
            >
                <div
                    ref={cubeRef}
                    style={{
                        width: SIZE,
                        height: SIZE,
                        position: "relative",
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                >
                    {faces.map((face) => (
                        <div
                            key={face.cls}
                            style={{
                                position: "absolute",
                                width: SIZE,
                                height: SIZE,
                                backgroundImage: "url('/images/artefact_cube.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                transform: face.transform,
                                backfaceVisibility: "visible",
                                border: `0.5px solid rgba(255,180,0,${hovered ? 0.4 : 0.15})`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
