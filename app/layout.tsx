import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import IntentIndicator from "@/components/ai/IntentIndicator";
import AuthGuard from "@/components/auth/AuthGuard";
import NavbarAuthArea from "@/components/auth/NavbarAuthArea";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDACS - Intent Driven Commerce",
  description: "Next Generation Intent-Driven E-Commerce MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col pt-16`}>
        {/* Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                IDACS
              </span>
            </Link>
            
            <div className="flex-1 flex justify-center">
              <IntentIndicator />
            </div>

            <nav className="flex items-center gap-4">
              <Link 
                href="/seller" 
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
              >
                <LayoutDashboard className="w-4 h-4" />
                Seller Dash
              </Link>
              <NavbarAuthArea />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <AuthGuard>
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
            {children}
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
