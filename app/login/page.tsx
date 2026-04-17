"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, UserCircle2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const { login, continueAsGuest } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Dummy authentication
      login(email);
      router.push("/");
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    router.push("/");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      {/* Decorative background element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white/60"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-600/30">
            <ShoppingBag className="w-8 h-8" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Welcome to IDACS</h1>
          <p className="text-gray-500 font-medium text-sm">Sign in to sync your intelligent cart across all your devices.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium text-gray-900 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5 pb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium text-gray-900 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] active:scale-95"
          >
            <ShieldCheck className="w-5 h-5" />
            Secure Login
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4 before:flex-1 before:h-px before:bg-gray-100 after:flex-1 after:h-px after:bg-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">OR</span>
        </div>

        <button 
          onClick={handleGuest}
          className="mt-6 w-full py-4 bg-white border-2 border-gray-100 text-gray-700 hover:text-gray-900 hover:border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <UserCircle2 className="w-5 h-5" />
          Continue as Guest
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

      </motion.div>
    </div>
  );
}
