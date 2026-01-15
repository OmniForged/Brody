import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Calendar, Mail, CheckCircle, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Dashboard() {
    const [preparing, setPreparing] = useState(false);
    const [briefs, setBriefs] = useState<any[]>([]);

    const handlePrepareDay = async () => {
        setPreparing(true);
        try {
            // Call the backend API
            const response = await axios.post('http://localhost:8000/api/v1/prepare-day');
            setBriefs(response.data);
        } catch (error) {
            console.error("Failed to prepare day", error);
            alert("Failed to connect to Brody backend. Ensure the server is running on port 8000.");
        } finally {
            setPreparing(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark text-slate-100 p-6 lg:p-10 font-sans">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-brand-neon to-indigo-400 bg-clip-text text-transparent tracking-tight">
                        Brody
                    </h1>
                    <p className="text-slate-400 text-lg mt-1">Your Proactive Intelligence</p>
                </div>
                <button
                    onClick={handlePrepareDay}
                    disabled={preparing}
                    className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-brand-neon/30",
                        preparing
                            ? "bg-slate-800 cursor-not-allowed opacity-70 text-slate-400"
                            : "bg-brand-neon/10 hover:bg-brand-neon/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] text-brand-neon"
                    )}
                >
                    <Sparkles className={cn("w-6 h-6", preparing && "animate-spin")} />
                    {preparing ? "Analyzing Context..." : "Prepare My Day"}
                </button>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column: Input Feed (Visual only for now) */}
                <section className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6">
                        <h2 className="text-xl font-semibold flex items-center gap-3 text-slate-300 mb-6">
                            <Calendar className="w-5 h-5 text-indigo-400" />
                            Context Stream
                        </h2>
                        <div className="space-y-4">
                            <div className="group flex gap-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="space-y-2 w-full">
                                    <div className="h-2 w-1/3 bg-slate-700 rounded-full opacity-60"></div>
                                    <div className="h-2 w-3/4 bg-slate-700 rounded-full opacity-40"></div>
                                </div>
                            </div>
                            <div className="group flex gap-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="space-y-2 w-full">
                                    <div className="h-2 w-1/2 bg-slate-700 rounded-full opacity-60"></div>
                                    <div className="h-2 w-2/3 bg-slate-700 rounded-full opacity-40"></div>
                                </div>
                            </div>
                            <div className="text-center pt-2">
                                <span className="text-xs font-mono text-slate-600 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">Live Connector Status: Active</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Column: Dynamic Output */}
                <section className="lg:col-span-8 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-3 text-slate-300">
                        <CheckCircle className="w-5 h-5 text-brand-neon" />
                        Prioritized Brief
                    </h2>

                    {briefs.length === 0 && !preparing && (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20 text-slate-500">
                            <div className="bg-slate-800 p-4 rounded-full mb-4 opacity-50">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <p className="text-lg">Ready to organize your day.</p>
                            <p className="text-sm opacity-60">Tap the button above to start.</p>
                        </div>
                    )}

                    <div className="grid gap-6">
                        {briefs.map(brief => (
                            <div key={brief.id} className="group relative overflow-hidden p-6 bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-3xl hover:border-brand-neon/50 transition-all hover:shadow-2xl hover:shadow-brand-neon/10">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-neon to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{brief.title}</h3>
                                        <p className="text-slate-400 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                            {brief.attendees.map((a: string) => a).join(", ")}
                                        </p>
                                    </div>
                                    <span className="flex items-center gap-2 text-sm font-mono bg-slate-950/50 px-4 py-2 rounded-xl text-brand-neon border border-brand-neon/20 shadow-inner">
                                        <Clock className="w-4 h-4" /> {brief.time}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                                    <div className="space-y-2">
                                        <strong className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Goal</strong>
                                        <p className="text-slate-200 leading-relaxed">{brief.goal}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <strong className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Talking Points</strong>
                                        <ul className="space-y-1">
                                            {brief.talking_points.map((tp: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-neon shrink-0"></span>
                                                    {tp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
