'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Utensils, Info } from 'lucide-react';

const shoppingList = [
    { item: "Skipjack Tuna (Spring Water)", price: "£1.20", protein: "39g", note: "High protein, low cal" },
    { item: "ASDA 10 Medium Eggs", price: "£2.80", protein: "60g total", note: "Essential breakfast" },
    { item: "Chicken Breast (1kg)", price: "£7.00", protein: "230g total", note: "Bulk buy frozen/fresh" },
    { item: "Red Lentils (1kg)", price: "£2.30", protein: "240g total", note: "Cheap carb/protein source" },
    { item: "Cottage Cheese (300g)", price: "£1.00", protein: "30g", note: "Slow release protein" },
    { item: "Frozen Mixed Veg", price: "£1.25", protein: "-", note: "Micronutrients" },
    { item: "Greek Yogurt (500g)", price: "£1.50", protein: "50g", note: "Snack/Breakfast" },
];

export default function DietPage() {
    return (
        <div className="space-y-6 pt-6">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Fuel Logistics</h1>
                <p className="text-zinc-400 text-sm">Target: 76kg Recomp</p>
            </header>

            {/* Macros */}
            <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-4 rounded-2xl border-l-4 border-blue-500">
                    <div className="text-zinc-500 text-xs uppercase font-bold">Daily Protein</div>
                    <div className="text-2xl font-bold text-white">140g</div>
                    <div className="text-xs text-zinc-400">1.8g per kg</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-l-4 border-green-500">
                    <div className="text-zinc-500 text-xs uppercase font-bold">Daily Calories</div>
                    <div className="text-2xl font-bold text-white">2,300</div>
                    <div className="text-xs text-zinc-400">Mild Deficit</div>
                </div>
            </div>

            {/* Shopping List */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl overflow-hidden"
            >
                <div className="p-4 border-b border-zinc-800 flex items-center gap-2 bg-zinc-900/30">
                    <ShoppingCart size={18} className="text-yellow-400" />
                    <h3 className="font-bold text-zinc-200">ASDA Deployment Kit</h3>
                </div>
                <div className="divide-y divide-zinc-800">
                    {shoppingList.map((item, i) => (
                        <div key={i} className="p-4 flex justify-between items-center hover:bg-zinc-900/50 transition-colors">
                            <div>
                                <div className="font-medium text-zinc-200">{item.item}</div>
                                <div className="text-xs text-zinc-500">{item.note}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-green-400 font-mono font-bold">{item.price}</div>
                                <div className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded inline-block mt-1">
                                    {item.protein}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Meal Prep Tip */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex gap-3">
                <Info className="text-zinc-400 shrink-0" size={20} />
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-200">Strategy:</strong> Cook 1kg Chicken on Sunday. Boil 6 eggs. Make a large pot of lentils. This covers lunch/dinner for 3-4 days.
                </p>
            </div>
        </div>
    );
}
