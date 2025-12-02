'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Fish, Building2, Box, Lock } from 'lucide-react';
import clsx from 'clsx';

const PATHS = [
    {
        id: 'reef',
        name: 'Bio-Synth Reef',
        desc: 'Cultivate a neon underwater ecosystem.',
        icon: Fish,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/50',
        locked: false,
        href: '/nexus/reef'
    },
    {
        id: 'city',
        name: 'Neon Metropolis',
        desc: 'Build a towering cyberpunk city.',
        icon: Building2,
        color: 'text-purple-400',
        bg: 'bg-zinc-900/50',
        border: 'border-zinc-800',
        locked: true,
        href: '#'
    },
    {
        id: 'vault',
        name: 'Artifact Vault',
        desc: 'Collect rare alien geometries.',
        icon: Box,
        color: 'text-yellow-400',
        bg: 'bg-zinc-900/50',
        border: 'border-zinc-800',
        locked: true,
        href: '#'
    }
];

export default function NexusPage() {
    return (
        <div className="space-y-6 pt-6 pb-24">
            <header className="flex items-center gap-4">
                <Link href="/">
                    <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">The Nexus</h1>
                    <p className="text-zinc-400 text-xs">Visual Progress Simulation</p>
                </div>
            </header>

            <div className="grid gap-4">
                {PATHS.map((path, i) => (
                    <Link key={path.id} href={path.href} className={path.locked ? 'pointer-events-none' : ''}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={clsx(
                                "relative p-6 rounded-2xl border flex items-center gap-4 overflow-hidden group transition-all",
                                path.bg,
                                path.border,
                                path.locked ? "opacity-50 grayscale" : "hover:scale-[1.02] cursor-pointer"
                            )}
                        >
                            <div className={clsx("p-3 rounded-xl bg-black/40", path.color)}>
                                <path.icon size={28} />
                            </div>
                            <div>
                                <h3 className={clsx("font-bold text-lg", path.locked ? "text-zinc-500" : "text-white")}>{path.name}</h3>
                                <p className="text-xs text-zinc-400">{path.desc}</p>
                            </div>

                            {path.locked && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                                    <Lock size={24} />
                                </div>
                            )}

                            {!path.locked && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            )}
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
