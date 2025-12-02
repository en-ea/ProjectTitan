'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Dumbbell, Utensils, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Fitness', href: '/fitness', icon: Dumbbell },
    { name: 'Diet', href: '/diet', icon: Utensils },
    { name: 'Uni', href: '/uni', icon: GraduationCap },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl shadow-black/50">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "relative p-2 rounded-full transition-colors duration-200",
                                isActive ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-zinc-800 rounded-full -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon size={24} />
                            <span className="sr-only">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
