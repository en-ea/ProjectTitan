'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Activity, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

export default function AnalyticsPage() {
    const [mounted, setMounted] = useState(false);
    const [xp, setXp] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('dashboardState_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            setXp(parsed.xp || 0);
        }
        setMounted(true);
    }, []);

    // Dummy Data for Visualization (Simulating history)
    const xpData = [
        { day: 'Mon', xp: Math.max(0, xp - 500) },
        { day: 'Tue', xp: Math.max(0, xp - 400) },
        { day: 'Wed', xp: Math.max(0, xp - 300) },
        { day: 'Thu', xp: Math.max(0, xp - 150) },
        { day: 'Fri', xp: Math.max(0, xp - 50) },
        { day: 'Sat', xp: xp },
        { day: 'Sun', xp: xp + 50 }, // Projected
    ];

    const habitData = [
        { subject: 'Gym', A: 120, fullMark: 150 },
        { subject: 'Deep Work', A: 98, fullMark: 150 },
        { subject: 'Hydration', A: 86, fullMark: 150 },
        { subject: 'Diet', A: 99, fullMark: 150 },
        { subject: 'Sleep', A: 85, fullMark: 150 },
        { subject: 'No Cigs', A: 65, fullMark: 150 },
    ];

    const viceData = [
        { name: 'Mon', smoked: 4, resisted: 2 },
        { name: 'Tue', smoked: 3, resisted: 5 },
        { name: 'Wed', smoked: 2, resisted: 8 },
        { name: 'Thu', smoked: 1, resisted: 10 },
        { name: 'Fri', smoked: 0, resisted: 12 },
    ];

    if (!mounted) return null;

    return (
        <div className="space-y-6 pt-6 pb-24">
            <header className="flex items-center gap-4">
                <Link href="/">
                    <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Analytics</h1>
                    <p className="text-zinc-400 text-xs">Data-Driven Evolution</p>
                </div>
            </header>

            {/* XP Growth */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-4 rounded-2xl space-y-4"
            >
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-cyan-400" size={20} />
                    <h2 className="font-bold text-white">XP Trajectory</h2>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={xpData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="xp" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Habit Radar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-4 rounded-2xl space-y-4"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-purple-400" size={20} />
                    <h2 className="font-bold text-white">Consistency Radar</h2>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={habitData}>
                            <PolarGrid stroke="#333" />
                            <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={10} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#333" />
                            <Radar name="Consistency" dataKey="A" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.3} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Vices Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-4 rounded-2xl space-y-4"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-green-400" size={20} />
                    <h2 className="font-bold text-white">The Battle: Smoke vs Resist</h2>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={viceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <Tooltip
                                cursor={{ fill: '#333', opacity: 0.2 }}
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Bar dataKey="smoked" name="Smoked" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="resisted" name="Resisted" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
