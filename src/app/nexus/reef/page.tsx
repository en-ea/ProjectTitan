'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ReefPage() {
    const [mounted, setMounted] = useState(false);
    const [xp, setXp] = useState(0);
    const [smokingCount, setSmokingCount] = useState(0);
    const [energyCount, setEnergyCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('dashboardState_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            setXp(parsed.xp || 0);
            setSmokingCount(parsed.smoking || 0);
            setEnergyCount(parsed.energy || 0);
        }
        setMounted(true);
    }, []);

    // Calculate Environment State
    const fishCount = Math.max(1, Math.floor(xp / 50));
    const isMurky = smokingCount > 0;
    const isGlitching = energyCount > 0;

    if (!mounted) return null;

    return (
        <div className={clsx(
            "min-h-screen w-full fixed inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-black transition-all duration-1000",
            isGlitching && "animate-pulse"
        )}>

            {/* Glitch Overlay */}
            {isGlitching && (
                <div className="absolute inset-0 z-50 pointer-events-none mix-blend-screen opacity-50 animate-pulse bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover opacity-10" />
            )}

            {/* Smog Overlay */}
            {isMurky && (
                <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-green-900/20 to-brown-900/40 mix-blend-multiply animate-pulse" />
            )}

            {/* UI Overlay */}
            <div className="absolute top-6 left-4 z-50">
                <Link href="/nexus">
                    <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg text-white/70 hover:text-white transition-colors border border-white/10">
                        <ArrowLeft size={20} />
                    </div>
                </Link>
            </div>

            <div className="absolute top-6 right-4 z-50 flex flex-col items-end gap-2">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    {fishCount} ORGANISMS
                </div>
                {isMurky && (
                    <div className="px-3 py-1 bg-red-900/40 backdrop-blur-md rounded-full border border-red-500/30 text-red-400 text-xs font-bold animate-pulse">
                        TOXICITY DETECTED
                    </div>
                )}
                {isGlitching && (
                    <div className="px-3 py-1 bg-yellow-900/40 backdrop-blur-md rounded-full border border-yellow-500/30 text-yellow-400 text-xs font-bold animate-bounce">
                        SYSTEM UNSTABLE
                    </div>
                )}
            </div>

            {/* Aquarium Container */}
            <div className="relative w-full h-full">

                {/* Background Rays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

                {/* Floating Plankton/Dust */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`dust-${i}`}
                        className="absolute bg-cyan-200/20 rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -50],
                            x: [null, Math.random() * 20 - 10],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: 1 + Math.random() * 2,
                            height: 1 + Math.random() * 2,
                        }}
                    />
                ))}

                {/* Fish */}
                {[...Array(fishCount)].map((_, i) => (
                    <CyberFish key={i} index={i} isGlitching={isGlitching} />
                ))}

                {/* Floor / Coral */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-blue-950/50 to-transparent z-10">
                    {/* Coral Shapes */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`coral-${i}`}
                            className="absolute bottom-0 w-8 bg-cyan-900/30 blur-sm rounded-t-full border-t border-cyan-500/20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                height: `${50 + Math.random() * 150}px`,
                                transform: `rotate(${Math.random() * 40 - 20}deg)`,
                                opacity: 0.5 + Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

function CyberFish({ index, isGlitching }: { index: number; isGlitching: boolean }) {
    // Randomized Properties
    const size = 20 + Math.random() * 25; // Smaller: 20-45px
    const duration = 20 + Math.random() * 20; // Slower, more majestic
    const delay = Math.random() * -20; // Negative delay to start mid-animation (scattered)
    const yStart = 10 + Math.random() * 80;
    const hue = Math.random() * 40 - 20; // Slight color variation

    return (
        <motion.div
            className={clsx(
                "absolute z-20",
                isGlitching && "animate-ping opacity-50 mix-blend-difference"
            )}
            style={{
                top: `${yStart}%`,
                width: size,
                height: size * 0.6,
                filter: `hue-rotate(${hue}deg)`
            }}
            initial={{ x: Math.random() * window.innerWidth }} // Start randomly on screen
            animate={{
                x: ['-10vw', '110vw'], // Swim across
                y: [0, -20, 20, 0],
                opacity: [0, 1, 1, 0]
            }}
            transition={{
                x: { duration: duration, repeat: Infinity, delay: delay, ease: "linear" },
                y: { duration: duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                opacity: { duration: duration, repeat: Infinity, delay: delay }
            }}
        >
            {/* SVG Fish */}
            <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                {/* Body */}
                <path
                    d="M10,30 Q30,5 60,15 T95,30 T60,45 T10,30 Z"
                    fill="rgba(6,182,212,0.2)"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    className="animate-pulse"
                />
                {/* Tail */}
                <path
                    d="M10,30 L0,15 L0,45 Z"
                    fill="rgba(6,182,212,0.3)"
                    stroke="#06b6d4"
                    strokeWidth="2"
                />
                {/* Eye */}
                <circle cx="80" cy="25" r="4" fill="#fff" className="animate-pulse" />
                {/* Gills */}
                <path d="M65,20 Q60,30 65,40" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M55,20 Q50,30 55,40" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6" />
            </svg>
        </motion.div>
    )
}
