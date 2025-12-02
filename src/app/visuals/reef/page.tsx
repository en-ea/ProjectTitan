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
    // LOWERED THRESHOLD: 1 Fish per 50 XP
    const fishCount = Math.max(1, Math.floor(xp / 50));
    const isMurky = smokingCount > 0;
    const isGlitching = energyCount > 0;

    if (!mounted) return null;

    return (
        <div className={clsx(
            "min-h-screen w-full fixed inset-0 overflow-hidden bg-black transition-all duration-1000",
            isGlitching && "animate-pulse"
        )}>
            {/* Deep Ocean Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#0f172a_0%,#020617_40%,#000000_100%)]" />

            {/* Light Rays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(6,182,212,0.03)_20deg,transparent_40deg,rgba(6,182,212,0.03)_60deg,transparent_80deg)] animate-[spin_60s_linear_infinite]" />
            </div>

            {/* Glitch Overlay */}
            {isGlitching && (
                <div className="absolute inset-0 z-50 pointer-events-none mix-blend-color-dodge opacity-20 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover" />
            )}

            {/* Smog Overlay */}
            {isMurky && (
                <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-green-950/30 to-transparent mix-blend-overlay" />
            )}

            {/* UI Overlay */}
            <div className="absolute top-6 left-4 z-50">
                <Link href="/visuals">
                    <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg text-white/70 hover:text-white transition-colors border border-white/10 hover:border-cyan-500/50">
                        <ArrowLeft size={20} />
                    </div>
                </Link>
            </div>

            <div className="absolute top-6 right-4 z-50 flex flex-col items-end gap-2">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {fishCount} ORGANISMS
                </div>
                {isMurky && (
                    <div className="px-3 py-1 bg-red-950/60 backdrop-blur-md rounded-full border border-red-500/30 text-red-400 text-xs font-bold animate-pulse">
                        TOXICITY DETECTED
                    </div>
                )}
                {isGlitching && (
                    <div className="px-3 py-1 bg-yellow-950/60 backdrop-blur-md rounded-full border border-yellow-500/30 text-yellow-400 text-xs font-bold animate-bounce">
                        SYSTEM UNSTABLE
                    </div>
                )}
            </div>

            {/* Aquarium Container */}
            <div className="relative w-full h-full perspective-1000">

                {/* Digital Plankton */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`plankton-${i}`}
                        className="absolute bg-cyan-400/30 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
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
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-blue-950/20 to-transparent z-10">
                    {/* Cyber Plants */}
                    {[...Array(12)].map((_, i) => (
                        <CyberPlant key={`plant-${i}`} index={i} />
                    ))}
                </div>

            </div>
        </div>
    );
}

function CyberFish({ index, isGlitching }: { index: number; isGlitching: boolean }) {
    const size = 80 + Math.random() * 60;
    const duration = 20 + Math.random() * 15;
    const delay = Math.random() * 10;
    const yStart = 10 + Math.random() * 70;
    const depth = Math.random(); // 0 to 1, used for parallax/blur

    return (
        <motion.div
            className={clsx(
                "absolute z-20 pointer-events-none",
                isGlitching && "mix-blend-difference"
            )}
            style={{
                top: `${yStart}%`,
                width: size,
                height: size * 0.5,
                filter: `blur(${depth * 2}px)`,
                opacity: 1 - depth * 0.5,
                zIndex: Math.floor((1 - depth) * 100)
            }}
            initial={{ x: -300 }}
            animate={{
                x: ['-20vw', '120vw'],
                y: [0, -40, 40, 0],
            }}
            transition={{
                x: { duration: duration, repeat: Infinity, delay: delay, ease: "linear" },
                y: { duration: duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            }}
        >
            <div className="relative w-full h-full group">
                {/* Fish Body SVG */}
                <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <defs>
                        <linearGradient id={`fishGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                            <stop offset="50%" stopColor="rgba(6,182,212,0.4)" />
                            <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                        </linearGradient>
                    </defs>

                    {/* Tail Animation */}
                    <motion.path
                        d="M15,25 L0,10 L0,40 Z"
                        fill={`url(#fishGrad-${index})`}
                        stroke="#06b6d4"
                        strokeWidth="0.5"
                        style={{ originX: "15px", originY: "25px" }}
                        animate={{ rotate: [-10, 10, -10] }}
                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Main Body */}
                    <path
                        d="M15,25 Q35,5 70,15 T95,25 T70,35 T15,25 Z"
                        fill={`url(#fishGrad-${index})`}
                        stroke="#06b6d4"
                        strokeWidth="1"
                    />

                    {/* Side Fins */}
                    <motion.path
                        d="M45,25 L35,35"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />

                    {/* Eye */}
                    <circle cx="82" cy="22" r="2" fill="#fff" className="animate-pulse">
                        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Cyber Lines */}
                    <path d="M60,18 L70,18" stroke="#06b6d4" strokeWidth="0.5" opacity="0.5" />
                    <path d="M55,32 L65,32" stroke="#06b6d4" strokeWidth="0.5" opacity="0.5" />
                </svg>
            </div>
        </motion.div>
    )
}

function CyberPlant({ index }: { index: number }) {
    const height = 60 + Math.random() * 100;
    const left = 5 + Math.random() * 90;

    return (
        <div
            className="absolute bottom-0 w-1 bg-gradient-to-t from-cyan-900/50 to-transparent"
            style={{
                left: `${left}%`,
                height: `${height}px`,
                transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
        >
            <motion.div
                className="w-2 h-2 bg-cyan-500/30 rounded-full absolute -top-1 -left-0.5 blur-[1px]"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            />
        </div>
    )
}
