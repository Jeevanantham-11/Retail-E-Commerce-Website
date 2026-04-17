"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Determine if we need to enforce redirect
    if (mounted && !isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }
  }, [mounted, isLoggedIn, pathname, router]);

  // Don't render the protected app if not mounted (prevents hydration mismatch)
  // or if they are currently unauthenticated on a protected page
  if (!mounted || (!isLoggedIn && pathname !== "/login")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Authenticating IDACS...</p>
      </div>
    );
  }

  // If they are on the login page, just render the login page itself (children).
  // If they are logged in, render the protected app (children).
  return <>{children}</>;
}
