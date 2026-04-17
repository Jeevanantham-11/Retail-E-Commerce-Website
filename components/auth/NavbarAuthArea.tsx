"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarAuthArea() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted || !isLoggedIn || !user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
      <div className="flex flex-col items-end">
        <span className="text-sm font-bold text-gray-900 leading-tight">
          {user.isGuest ? "Guest User" : "Welcome,"}
        </span>
        <span className="text-xs font-medium text-gray-500">
          {user.isGuest ? (
            <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              <Sparkles className="w-3 h-3" /> AI Shopper Mode
            </span>
          ) : (
            user.email
          )}
        </span>
      </div>
      
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner">
        <User className="w-5 h-5" />
      </div>

      <button 
        onClick={handleLogout}
        className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}
