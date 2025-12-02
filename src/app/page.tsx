'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cigarette, Droplets, BookOpen, Flame, Calendar, Shield, Zap, ChevronRight, Trophy, X, TrendingUp, Fish } from 'lucide-react';
import clsx from 'clsx';

// --- Leveling System ---
const RANKS = [
  { level: 1, title: "INITIATE", color: "text-zinc-400", icon: Trophy, req: 0 },
  { level: 5, title: "ADEPT", color: "text-cyan-400", icon: Zap, req: 500 },
  { level: 10, title: "ELITE", color: "text-purple-400", icon: Flame, req: 1000 },
  { level: 20, title: "TITAN", color: "text-yellow-400", icon: Trophy, req: 2000 },
];

function getRank(level: number) {
  return [...RANKS].reverse().find(r => level >= r.level) || RANKS[0];
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [showLevelModal, setShowLevelModal] = useState(false);

  // Persistent State
  const [xp, setXp] = useState(0);
  const [smokingCount, setSmokingCount] = useState(0);
  const [energyCount, setEnergyCount] = useState(0);
  const [waterCount, setWaterCount] = useState(0);
  const [studyHours, setStudyHours] = useState(0);

  // Load State & Handle Daily Reset
  useEffect(() => {
    const saved = localStorage.getItem('dashboardState_v2'); // V2 forces reset
    const today = new Date().toISOString().split('T')[0];

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.lastLoginDate !== today) {
        // New Day: Reset Vitals, Keep XP
        setWaterCount(0);
        setStudyHours(0);
        setSmokingCount(0);
        setEnergyCount(0);
        setXp(parsed.xp || 0);
      } else {
        // Same Day: Restore All
        setWaterCount(parsed.water || 0);
        setStudyHours(parsed.study || 0);
        setSmokingCount(parsed.smoking || 0);
        setEnergyCount(parsed.energy || 0);
        setXp(parsed.xp || 0);
      }
    }
    setMounted(true);
  }, []);

  // Save State on Change
  useEffect(() => {
    if (!mounted) return;
    const today = new Date().toISOString().split('T')[0];
    const state = {
      lastLoginDate: today,
      xp,
      water: waterCount,
      study: studyHours,
      smoking: smokingCount,
      energy: energyCount
    };
    localStorage.setItem('dashboardState_v2', JSON.stringify(state));
  }, [xp, waterCount, studyHours, smokingCount, energyCount, mounted]);

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      setTimeLeft({ days, hours, minutes });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;
  const currentRank = getRank(level);
  const RankIcon = currentRank.icon;

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pt-8 pb-20">
      {/* Header / Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold tracking-tighter neon-text">PROTOCOL: PEAK</h1>
        <div className="flex justify-center gap-4 text-zinc-400 font-mono text-sm">
          <div className="bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800">
            <span className="text-white font-bold text-xl">{timeLeft.days}</span> DAYS
          </div>
          <div className="bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800">
            <span className="text-white font-bold text-xl">{timeLeft.hours}</span> HRS
          </div>
        </div>

        {/* Level / XP Bar */}
        <div
          className="max-w-xs mx-auto mt-6 cursor-pointer group"
          onClick={() => setShowLevelModal(true)}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <RankIcon className={clsx("w-5 h-5", currentRank.color)} />
            <span className={clsx("text-sm font-bold tracking-widest", currentRank.color)}>{currentRank.title}</span>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </div>
          <div className="flex justify-between text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
            <span>Level {level}</span>
            <span>{progress} / 100 XP</span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 gap-4">

        {/* Avoidance Cards */}
        <AvoidanceCard
          title="Smoking"
          icon={Cigarette}
          count={smokingCount}
          color="text-red-400"
          onLog={() => setSmokingCount(p => p + 1)}
          onUndo={() => setSmokingCount(p => Math.max(0, p - 1))}
          onResist={() => addXp(15)}
        />

        <AvoidanceCard
          title="Energy Drinks"
          icon={Zap}
          count={energyCount}
          color="text-yellow-400"
          onLog={() => setEnergyCount(p => p + 1)}
          onUndo={() => setEnergyCount(p => Math.max(0, p - 1))}
          onResist={() => addXp(15)}
        />

        {/* Hydration Card */}
        <VitalCard
          title="Hydration"
          icon={Droplets}
          value={waterCount}
          unit="L"
          color="text-blue-400"
          onIncrement={() => {
            setWaterCount(p => Number((p + 0.5).toFixed(1)));
            addXp(5);
          }}
          onDecrement={() => setWaterCount(p => Math.max(0, Number((p - 0.5).toFixed(1))))}
        />

        {/* Deep Work Card */}
        <VitalCard
          title="Deep Work"
          icon={BookOpen}
          value={studyHours}
          unit="hrs"
          color="text-purple-400"
          onIncrement={() => {
            setStudyHours(p => p + 1);
            addXp(20);
          }}
          onDecrement={() => setStudyHours(p => Math.max(0, p - 1))}
        />
      </div>

      {/* Utility Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              localStorage.removeItem('dashboardState_v2');
              setXp(0);
              setWaterCount(0);
              setStudyHours(0);
              setSmokingCount(0);
              setEnergyCount(0);
              window.location.reload();
            }
          }}
          className="p-4 rounded-2xl bg-red-900/20 border border-red-500/20 flex flex-col items-center justify-center gap-2 hover:bg-red-900/30 transition-all"
        >
          <span className="text-red-400 font-bold">RESET PROGRESS</span>
          <span className="text-xs text-red-500/60">Clear All Data</span>
        </button>

        <button
          onClick={() => {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
            audio.volume = 0.5;
            audio.play();
            addXp(20);
          }}
          className="p-4 rounded-2xl bg-cyan-900/20 border border-cyan-500/20 flex flex-col items-center justify-center gap-2 hover:bg-cyan-900/30 transition-all"
        >
          <span className="text-cyan-400 font-bold">DEEP WORK</span>
          <span className="text-xs text-cyan-500/60">+20 XP / hr</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/tracker">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <Calendar className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xs font-bold text-zinc-300">Daily Tracker</span>
          </div>
        </Link>
        <Link href="/analytics">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <TrendingUp className="text-purple-400 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xs font-bold text-zinc-300">Analytics</span>
          </div>
        </Link>
        <Link href="/nexus">
          <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <Fish className="text-green-400 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xs font-bold text-zinc-300">The Nexus</span>
          </div>
        </Link>
      </div>

      {/* Level Roadmap Modal */}
      <AnimatePresence>
        {showLevelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLevelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full space-y-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Rank Progression</h2>
                <button onClick={() => setShowLevelModal(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-800 -z-10" />

                {RANKS.map((rank) => {
                  const isUnlocked = level >= rank.level;
                  const Icon = rank.icon;
                  return (
                    <div key={rank.level} className={clsx("flex items-center gap-4", isUnlocked ? "opacity-100" : "opacity-40 grayscale")}>
                      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center border-2 bg-zinc-900", isUnlocked ? clsx("border-current", rank.color) : "border-zinc-800")}>
                        <Icon size={18} className={isUnlocked ? rank.color : "text-zinc-600"} />
                      </div>
                      <div>
                        <div className={clsx("font-bold text-sm tracking-widest", rank.color)}>{rank.title}</div>
                        <div className="text-xs text-zinc-500">Level {rank.level}+</div>
                      </div>
                      {isUnlocked && <div className="ml-auto text-xs font-bold text-green-500">UNLOCKED</div>}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Components ---

interface AvoidanceCardProps {
  title: string;
  icon: React.ElementType;
  count: number;
  color: string;
  onLog: () => void;
  onUndo: () => void;
  onResist: () => void;
}

function AvoidanceCard({ title, icon: Icon, count, color, onLog, onUndo, onResist }: AvoidanceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-40"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={clsx("p-2 rounded-lg bg-zinc-900", color)}>
            <Icon size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">{count}</div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold mt-1">{title}</div>
          </div>
        </div>
        {/* Undo Button (Hidden unless count > 0) */}
        {count > 0 && (
          <button onClick={onUndo} className="text-zinc-600 hover:text-red-400 transition-colors text-xs">
            Undo
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={onLog}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-bold py-2 rounded transition-colors"
        >
          + Log
        </button>
        <button
          onClick={onResist}
          className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors"
        >
          <Shield size={14} />
          Resist
        </button>
      </div>
    </motion.div>
  )
}

interface VitalCardProps {
  title: string;
  icon: React.ElementType;
  value: number;
  unit: string;
  color: string;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

function VitalCard({ title, icon: Icon, value, unit, color, onIncrement, onDecrement, className }: VitalCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx("glass-panel p-4 rounded-2xl flex flex-col justify-between h-40", className)}
    >
      <div className="flex justify-between items-start">
        <div className={clsx("p-2 rounded-lg bg-zinc-900", color)}>
          <Icon size={20} />
        </div>
        <div className="flex gap-1">
          <button onClick={onDecrement} className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 transition-colors">-</button>
          <button onClick={onIncrement} className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 transition-colors">+</button>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value} <span className="text-sm font-normal text-zinc-500">{unit}</span></div>
        <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{title}</div>
      </div>
    </motion.div>
  )
}
