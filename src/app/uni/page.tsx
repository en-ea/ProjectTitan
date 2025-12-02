'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Smartphone, ShieldCheck, ChevronDown, ChevronUp, Check, ArrowRight, X } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

interface TaskDetails {
    specifics: string;
    prev?: string;
    next?: string;
}

interface Task {
    id: number;
    text: string;
    done: boolean;
    details?: TaskDetails;
}

interface Module {
    id: string;
    name: string;
    icon: any;
    color: string;
    details: {
        tech: string;
        advice: string;
        structure: string;
    };
    tasks: Task[];
}

const modules: Module[] = [
    {
        id: 'ai',
        name: 'Artificial Intelligence',
        icon: Brain,
        color: 'text-purple-400',
        details: {
            tech: "Python, Pandas, Scikit-learn, Jupyter Notebooks",
            advice: "Focus on the Data Pipeline: Cleaning -> Feature Engineering -> Split -> Train -> Eval. For Churn Prediction, use 'Random Forest' or 'XGBoost'.",
            structure: "1. Data Analysis (EDA) 2. Preprocessing 3. Model Selection 4. Hyperparameter Tuning 5. Conclusion"
        },
        tasks: [
            {
                id: 1,
                text: 'Data Preprocessing (Pandas)',
                done: true,
                details: {
                    specifics: "Load the CSV. Check for null values (`df.isnull().sum()`). Handle categorical data using One-Hot Encoding (`pd.get_dummies`). Normalize numerical features.",
                    next: "Churn Prediction Model"
                }
            },
            {
                id: 2,
                text: 'Churn Prediction Model',
                done: false,
                details: {
                    specifics: "Train a Random Forest Classifier (`RandomForestClassifier`). Split data 80/20. Use SMOTE if the dataset is imbalanced (churners are rare).",
                    prev: "Data Preprocessing",
                    next: "Model Evaluation Metrics"
                }
            },
            {
                id: 3,
                text: 'Model Evaluation Metrics',
                done: false,
                details: {
                    specifics: "Don't just use Accuracy. Use Precision, Recall, and F1-Score (`classification_report`). Plot a Confusion Matrix to visualize errors.",
                    prev: "Churn Prediction Model"
                }
            },
        ]
    },
    {
        id: 'fyp',
        name: 'Final Year Project',
        icon: Smartphone,
        color: 'text-blue-400',
        details: {
            tech: "Android (Kotlin/Jetpack Compose) OR Flutter (Dart). Python (FastAPI) for backend.",
            advice: "The 'Brain' should be an API (OpenAI/HuggingFace). The App is just a UI wrapper. Don't build the AI model from scratch on the phone.",
            structure: "MVVM Architecture: Model (Data/API), View (UI), ViewModel (Logic)."
        },
        tasks: [
            {
                id: 1,
                text: 'Poster Submission',
                done: true,
                details: {
                    specifics: "Design a high-level overview of the project. Focus on the 'Problem' you are solving and the 'Solution' architecture. Keep text minimal, use diagrams.",
                    next: "Core Feature Planning"
                }
            },
            {
                id: 2,
                text: 'Core Feature Planning',
                done: false,
                details: {
                    specifics: "Define the MVP (Minimum Viable Product). What is the ONE thing the app must do? (e.g. Summarize Text). Don't feature creep.",
                    prev: "Poster Submission",
                    next: "UI Prototype"
                }
            },
            {
                id: 3,
                text: 'UI Prototype (Figma/XML)',
                done: false,
                details: {
                    specifics: "Create a low-fidelity wireframe. Map out the user flow: Login -> Home -> Action -> Result. Use Figma or just sketch it out.",
                    prev: "Core Feature Planning",
                    next: "Summarization API Integration"
                }
            },
            {
                id: 4,
                text: 'Summarization API Integration',
                done: false,
                details: {
                    specifics: "Set up a FastAPI backend that calls OpenAI/HuggingFace. Test it with Postman. Then connect your mobile app to this API using Retrofit (Android) or Dio (Flutter).",
                    prev: "UI Prototype"
                }
            },
        ]
    },
    {
        id: 'sec',
        name: 'Secure Software Dev',
        icon: ShieldCheck,
        color: 'text-green-400',
        details: {
            tech: "Java/Python (likely), OWASP ZAP, SonarQube",
            advice: "Focus on the 'OWASP Top 10'. Implement defenses against SQL Injection, XSS, and Broken Auth.",
            structure: "1. Threat Modeling 2. Secure Design Patterns 3. Implementation 4. Security Testing"
        },
        tasks: [
            {
                id: 1,
                text: 'Review New Coursework Brief',
                done: false,
                details: {
                    specifics: "Read the brief 3 times. Highlight key requirements: What attack vectors must be mitigated? What language must be used?",
                    next: "Threat Modeling"
                }
            },
            {
                id: 2,
                text: 'Threat Modeling',
                done: false,
                details: {
                    specifics: "Create a Data Flow Diagram (DFD) and identify trust boundaries. Use STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege) to categorize threats.",
                    prev: "Review Brief",
                    next: "Security Analysis Report"
                }
            },
            {
                id: 3,
                text: 'Security Analysis Report',
                done: false,
                details: {
                    specifics: "Document every vulnerability found and the countermeasure implemented. Use CVSS scoring if applicable to rate severity.",
                    prev: "Threat Modeling"
                }
            },
        ]
    }
];

export default function UniPage() {
    const [localModules, setLocalModules] = useState(modules);
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);

    const toggleTask = (moduleId: string, taskId: number) => {
        setLocalModules(prev => prev.map(m => {
            if (m.id !== moduleId) return m;
            return {
                ...m,
                tasks: m.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
            };
        }));
    };

    return (
        <div className="space-y-6 pt-6 pb-24 relative">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Academic Roadmap</h1>
                <p className="text-zinc-400 text-sm">Milestone Tracker</p>
            </header>

            <div className="space-y-6">
                {localModules.map((module, i) => (
                    <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div
                            onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                            className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={clsx("p-2 rounded-lg bg-zinc-950", module.color)}>
                                    <module.icon size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-zinc-200">{module.name}</h2>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-0.5">
                                        {module.tasks.filter(t => t.done).length} / {module.tasks.length} Complete
                                    </div>
                                </div>
                            </div>
                            {expandedModule === module.id ? <ChevronUp size={20} className="text-zinc-500" /> : <ChevronDown size={20} className="text-zinc-500" />}
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                            {expandedModule === module.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-zinc-950/30 border-b border-zinc-800"
                                >
                                    <div className="p-4 space-y-3 text-sm">
                                        <div>
                                            <span className="text-cyan-400 font-bold uppercase text-xs">Tech Stack:</span>
                                            <p className="text-zinc-300">{module.details.tech}</p>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold uppercase text-xs">Strategy:</span>
                                            <p className="text-zinc-300">{module.details.advice}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Roadmap Visualization */}
                        <div className="p-5 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-zinc-800" />

                            <div className="space-y-6 relative z-10">
                                {module.tasks.map((task, index) => {
                                    const isNext = !task.done && (index === 0 || module.tasks[index - 1].done);

                                    return (
                                        <div key={task.id} className="flex gap-4 items-start group">
                                            <button
                                                onClick={() => toggleTask(module.id, task.id)}
                                                className={clsx(
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all bg-zinc-950",
                                                    task.done ? "border-cyan-500 text-cyan-500" :
                                                        isNext ? "border-white animate-pulse" : "border-zinc-700 text-transparent"
                                                )}
                                            >
                                                {task.done && <Check size={12} strokeWidth={3} />}
                                                {isNext && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </button>

                                            <div className={clsx("flex-1 pt-0.5 transition-opacity", !isNext && !task.done && "opacity-50")}>
                                                <div className={clsx(
                                                    "text-sm font-medium",
                                                    task.done ? "text-zinc-400 line-through" :
                                                        isNext ? "text-white" : "text-zinc-500"
                                                )}>
                                                    {task.text}
                                                </div>
                                                {isNext && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTask(task);
                                                        }}
                                                        className="text-[10px] text-cyan-400 font-bold uppercase mt-1 flex items-center gap-1 hover:underline cursor-pointer"
                                                    >
                                                        Current Objective <ArrowRight size={10} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Task Details Modal */}
            <AnimatePresence>
                {selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTask(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedTask(null)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-xl font-bold text-white mb-4 pr-8">{selectedTask.text}</h3>

                            <div className="space-y-4">
                                {selectedTask.details?.specifics && (
                                    <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl">
                                        <div className="text-cyan-400 text-xs font-bold uppercase mb-1">Specifics</div>
                                        <p className="text-zinc-200 text-sm leading-relaxed">{selectedTask.details.specifics}</p>
                                    </div>
                                )}

                                <div className="flex gap-3 text-xs">
                                    {selectedTask.details?.prev && (
                                        <div className="flex-1 p-3 bg-zinc-950 rounded-xl border border-zinc-800 opacity-60">
                                            <div className="text-zinc-500 font-bold uppercase mb-1">Previous</div>
                                            <div className="text-zinc-400">{selectedTask.details.prev}</div>
                                        </div>
                                    )}
                                    {selectedTask.details?.next && (
                                        <div className="flex-1 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                                            <div className="text-zinc-500 font-bold uppercase mb-1">Next Step</div>
                                            <div className="text-zinc-300">{selectedTask.details.next}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
