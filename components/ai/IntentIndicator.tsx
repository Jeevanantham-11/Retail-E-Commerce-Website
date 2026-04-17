"use client";

import { useIntentStore } from "@/store/useIntentStore";
import { BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function IntentIndicator() {
  const { scores, dominantIntent } = useIntentStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Avoid hydration mismatch by waiting for mount since Zustand persist uses local storage
  useEffect(() => setMounted(true), []);

  if (!mounted || pathname === "/login") return null;

  const totalScore = scores.fitness + scores.gaming + scores.student + scores.summer;
  
  if (totalScore === 0) return null; // Hide if no interaction yet

  const percentages = {
    fitness: totalScore > 0 ? (scores.fitness / totalScore) * 100 : 0,
    gaming: totalScore > 0 ? (scores.gaming / totalScore) * 100 : 0,
    student: totalScore > 0 ? (scores.student / totalScore) * 100 : 0,
    summer: totalScore > 0 ? (scores.summer / totalScore) * 100 : 0,
  };

  return (
    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-inner max-w-sm">
      <div className="flex flex-col items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0">
        <BrainCircuit className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-200 px-1.5 py-0.5 rounded">
          {dominantIntent}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col gap-1.5 w-48">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
          AI Confidence Core
        </span>
        
        {/* Fitness Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
          <div className="bg-emerald-500 h-1.5 transition-all duration-500" style={{ width: `${percentages.fitness}%` }} title="Fitness" />
        </div>
        {/* Gaming Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
          <div className="bg-purple-500 h-1.5 transition-all duration-500" style={{ width: `${percentages.gaming}%` }} title="Gaming" />
        </div>
        {/* Student Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
          <div className="bg-orange-500 h-1.5 transition-all duration-500" style={{ width: `${percentages.student}%` }} title="Student" />
        </div>
        {/* Summer Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
          <div className="bg-yellow-400 h-1.5 transition-all duration-500" style={{ width: `${percentages.summer}%` }} title="Summer" />
        </div>
      </div>
    </div>
  );
}
