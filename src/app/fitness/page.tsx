'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Activity, CalendarDays, Info } from 'lucide-react';
import clsx from 'clsx';

const workouts = {
    Push: {
        name: "Push Day",
        focus: "Chest, Shoulders, Triceps",
        exercises: [
            { name: "Barbell Bench Press", sets: "4", reps: "6-8", note: "Heavy Compound" },
            { name: "Overhead Press", sets: "3", reps: "8-12", note: "Shoulder Stability" },
            { name: "Incline DB Press", sets: "3", reps: "10-12", note: "Upper Chest" },
            { name: "Lateral Raises", sets: "4", reps: "15-20", note: "Side Delts" },
            { name: "Tricep Pushdowns", sets: "3", reps: "12-15", note: "Isolation" },
        ]
    },
    Pull: {
        name: "Pull Day",
        focus: "Back, Biceps, Rear Delts",
        exercises: [
            { name: "Deadlifts", sets: "3", reps: "5-8", note: "Full Body Power" },
            { name: "Pull-Ups / Lat Pulldowns", sets: "4", reps: "8-12", note: "Back Width" },
            { name: "Seated Cable Rows", sets: "3", reps: "10-12", note: "Back Thickness" },
            { name: "Face Pulls", sets: "3", reps: "15-20", note: "Posture/Rear Delts" },
            { name: "Barbell Curls", sets: "3", reps: "10-12", note: "Bicep Mass" },
        ]
    },
    Legs: {
        name: "Leg Day",
        focus: "Quads, Hamstrings, Calves",
        exercises: [
            { name: "Barbell Squats", sets: "4", reps: "6-10", note: "King of Legs" },
            { name: "Romanian Deadlifts", sets: "3", reps: "8-12", note: "Hamstrings" },
            { name: "Leg Press", sets: "3", reps: "12-15", note: "Volume" },
            { name: "Leg Extensions", sets: "3", reps: "15-20", note: "Quad Isolation" },
            { name: "Calf Raises", sets: "4", reps: "15-20", note: "Don't skip these" },
        ]
    }
};

const schedule = [
    { day: "Mon", type: "Push" },
    { day: "Tue", type: "Pull" },
    { day: "Wed", type: "Legs" },
    { day: "Thu", type: "Push" },
    { day: "Fri", type: "Pull" },
    { day: "Sat", type: "Legs" },
    { day: "Sun", type: "Rest" },
];

export default function FitnessPage() {
    const [activeTab, setActiveTab] = useState<'Push' | 'Pull' | 'Legs'>('Push');

    return (
        <div className="space-y-6 pt-6 pb-24">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold text-white">6-Day PPL Split</h1>
                <p className="text-zinc-400 text-sm">High Frequency • Max Hypertrophy</p>
            </header>

            {/* Schedule Overview */}
            <div className="glass-panel p-4 rounded-2xl overflow-x-auto scrollbar-hide">
                <div className="grid grid-cols-7 min-w-[600px] md:min-w-0 gap-2">
                    {schedule.map((s, i) => (
                        <div key={i} className={clsx(
                            "flex flex-col items-center p-2 rounded-xl",
                            s.type === "Rest" ? "bg-zinc-900/30 border border-zinc-800" : "bg-zinc-900 border border-zinc-700"
                        )}>
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">{s.day}</span>
                            <span className={clsx(
                                "text-xs font-bold mt-1",
                                s.type === "Rest" ? "text-zinc-600" : "text-cyan-400"
                            )}>{s.type}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Workout Selector */}
            <div className="flex p-1 bg-zinc-950/50 backdrop-blur-md rounded-full border border-zinc-800/50">
                {(['Push', 'Pull', 'Legs'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "flex-1 py-2 text-sm font-bold rounded-full transition-all duration-300",
                            activeTab === tab
                                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Workout Details */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="glass-panel rounded-2xl p-5 space-y-4"
                >
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">{workouts[activeTab].name}</h2>
                            <p className="text-xs text-cyan-400 uppercase tracking-wider">{workouts[activeTab].focus}</p>
                        </div>
                        <div className="p-2 bg-zinc-800 rounded-lg">
                            <Dumbbell className="text-zinc-400" size={20} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {workouts[activeTab].exercises.map((ex, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                                <div>
                                    <div className="text-zinc-200 font-medium">{ex.name}</div>
                                    <div className="text-[10px] text-zinc-500">{ex.note}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-bold">{ex.sets} x {ex.reps}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">Sets x Reps</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Cardio Section */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <Activity className="text-green-400" size={20} />
                    <h3 className="font-bold text-white">Cardio Protocol</h3>
                </div>
                <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50 flex gap-3">
                    <Info className="text-zinc-400 shrink-0" size={18} />
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Since you are lifting 6 days a week, keep cardio low impact. Do <strong>20 mins Incline Walk</strong> after every workout.
                    </p>
                </div>
            </div>
        </div>
    );
}
