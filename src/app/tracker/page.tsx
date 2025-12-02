'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Dumbbell, BookOpen, Cigarette, Droplets, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface DailyLog {
    gym: boolean;
    uniHours: number;
    habits: {
        noSmoking: boolean;
        water: boolean;
        deepWork: boolean;
    };
}

export default function TrackerPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<Record<string, DailyLog>>({});
    const [mounted, setMounted] = useState(false);

    // Load logs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('dailyLogs');
        if (saved) {
            setLogs(JSON.parse(saved));
        }
        setMounted(true);
    }, []);

    // Save logs to localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('dailyLogs', JSON.stringify(logs));
        }
    }, [logs, mounted]);

    const dateKey = selectedDate.toISOString().split('T')[0];
    const currentLog = logs[dateKey] || {
        gym: false,
        uniHours: 0,
        habits: { noSmoking: false, water: false, deepWork: false }
    };

    const updateLog = (updates: Partial<DailyLog> | Partial<DailyLog['habits']>, isHabit = false) => {
        setLogs(prev => {
            const existing = prev[dateKey] || {
                gym: false,
                uniHours: 0,
                habits: { noSmoking: false, water: false, deepWork: false }
            };

            if (isHabit) {
                return {
                    ...prev,
                    [dateKey]: { ...existing, habits: { ...existing.habits, ...updates } }
                };
            }

            return {
                ...prev,
                [dateKey]: { ...existing, ...updates }
            };
        });
    };

    // Calendar Logic
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay(); // 0 = Sun
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Mon start

    const getWorkoutType = (date: Date) => {
        const day = date.getDay();
        if (day === 0) return "Rest";
        if (day === 1 || day === 4) return "Push";
        if (day === 2 || day === 5) return "Pull";
        if (day === 3 || day === 6) return "Legs";
        return "Rest";
    };

    return (
        <div className="space-y-6 pt-6 pb-24">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Daily Log</h1>
                <p className="text-zinc-400 text-sm">Consistency is Key</p>
            </header>

            {/* Calendar Grid */}
            <div className="glass-panel p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))} className="p-1 hover:bg-zinc-800 rounded">
                        <ChevronLeft size={20} className="text-zinc-400" />
                    </button>
                    <h2 className="font-bold text-zinc-200">
                        {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))} className="p-1 hover:bg-zinc-800 rounded">
                        <ChevronRight size={20} className="text-zinc-400" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-zinc-500 font-bold">
                    <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: offset }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {days.map(day => {
                        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                        const dKey = date.toISOString().split('T')[0];
                        const hasLog = logs[dKey];
                        const isSelected = dKey === dateKey;

                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(date)}
                                className={clsx(
                                    "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all",
                                    isSelected ? "bg-cyan-500 text-black font-bold" : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                {day}
                                {hasLog && (
                                    <div className="flex gap-0.5 mt-1">
                                        {hasLog.gym && <div className="w-1 h-1 rounded-full bg-green-400" />}
                                        {hasLog.uniHours > 0 && <div className="w-1 h-1 rounded-full bg-purple-400" />}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Daily Entry */}
            <motion.div
                key={dateKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
            >
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
                    <span className="text-xs font-normal text-zinc-500 px-2 py-1 bg-zinc-900 rounded-full border border-zinc-800">
                        {getWorkoutType(selectedDate)} Day
                    </span>
                </h3>

                {/* Gym Toggle */}
                <div
                    onClick={() => updateLog({ gym: !currentLog.gym })}
                    className={clsx(
                        "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                        currentLog.gym ? "bg-green-500/10 border-green-500/50" : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className={clsx("p-2 rounded-lg", currentLog.gym ? "bg-green-500 text-black" : "bg-zinc-950 text-zinc-500")}>
                            <Dumbbell size={20} />
                        </div>
                        <div>
                            <div className={clsx("font-bold", currentLog.gym ? "text-green-400" : "text-zinc-300")}>Gym Session</div>
                            <div className="text-xs text-zinc-500">{getWorkoutType(selectedDate)} Workout</div>
                        </div>
                    </div>
                    {currentLog.gym ? <CheckCircle2 className="text-green-400" /> : <Circle className="text-zinc-600" />}
                </div>

                {/* Uni Hours */}
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-zinc-950 text-purple-400">
                            <BookOpen size={20} />
                        </div>
                        <div className="font-bold text-zinc-300">Uni Work</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={currentLog.uniHours}
                            onChange={(e) => updateLog({ uniHours: parseFloat(e.target.value) })}
                            className="flex-1 accent-purple-500 h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="font-mono font-bold text-purple-400 w-12 text-right">{currentLog.uniHours}h</div>
                    </div>
                </div>

                {/* Habits */}
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => updateLog({ noSmoking: !currentLog.habits.noSmoking }, true)}
                        className={clsx(
                            "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                            currentLog.habits.noSmoking ? "bg-red-500/10 border-red-500/50" : "bg-zinc-900/50 border-zinc-800"
                        )}
                    >
                        <Cigarette size={20} className={currentLog.habits.noSmoking ? "text-red-400" : "text-zinc-600"} />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">No Smoke</span>
                    </button>
                    <button
                        onClick={() => updateLog({ water: !currentLog.habits.water }, true)}
                        className={clsx(
                            "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                            currentLog.habits.water ? "bg-blue-500/10 border-blue-500/50" : "bg-zinc-900/50 border-zinc-800"
                        )}
                    >
                        <Droplets size={20} className={currentLog.habits.water ? "text-blue-400" : "text-zinc-600"} />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Water</span>
                    </button>
                    <button
                        onClick={() => updateLog({ deepWork: !currentLog.habits.deepWork }, true)}
                        className={clsx(
                            "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                            currentLog.habits.deepWork ? "bg-orange-500/10 border-orange-500/50" : "bg-zinc-900/50 border-zinc-800"
                        )}
                    >
                        <Flame size={20} className={currentLog.habits.deepWork ? "text-orange-400" : "text-zinc-600"} />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Deep Work</span>
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
