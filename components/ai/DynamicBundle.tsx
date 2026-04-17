"use client";

import { useEffect, useState } from "react";
import { useIntentStore } from "@/store/useIntentStore";
import { Product } from "@/data/products";
import { Bot, Sparkles, Plus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../commerce/ProductCard";

interface BundleData {
  bundle: Product[];
  explanation: string;
}

export default function DynamicBundle() {
  const { dominantIntent } = useIntentStore();
  const [data, setData] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dominantIntent === "neutral" || !dominantIntent) {
      setData(null);
      return;
    }

    const fetchBundle = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/ai/bundle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dominantIntent }),
        });
        const result = await response.json();
        if (result.bundle && result.bundle.length > 0) {
          setData(result);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Failed to fetch bundle");
      } finally {
        setLoading(false);
      }
    };

    fetchBundle();
  }, [dominantIntent]);

  return (
    <AnimatePresence>
      {data && (
        <motion.section
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-16 relative z-10"
        >
          <div className="relative rounded-[2.5rem] bg-white border border-indigo-50 overflow-hidden shadow-[0_20px_60px_rgb(59,130,246,0.15)] p-1.5">
            {/* Animated Glow Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 opacity-20 blur-xl animate-pulse delay-700" />
            
            <div className="relative bg-white/80 backdrop-blur-3xl rounded-[2.2rem] p-8 md:p-12 border border-white/50">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-black tracking-wide shadow-[0_4px_14px_0_rgb(59,130,246,0.39)] mb-5 uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Autonomous Cart</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                    Curated for your objective.
                  </h2>
                </div>
                
                {/* Explainable AI UI */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 md:max-w-md shadow-inner"
                >
                  <div className="flex items-center gap-2 text-indigo-700 font-black mb-2 text-xs uppercase tracking-[0.2em]">
                    <Bot className="w-4 h-4" />
                    Explainable AI
                  </div>
                  <p className="text-indigo-900/80 text-sm font-medium leading-relaxed">
                    {data.explanation}
                  </p>
                </motion.div>
              </div>

              {/* Bundle Products */}
              <div className="relative">
                {loading && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                  {data.bundle.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                      className="flex-1 relative"
                    >
                      <ProductCard product={product} />
                      {index < data.bundle.length - 1 && (
                         <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-100 rounded-full items-center justify-center border-4 border-white text-gray-400">
                           <Plus className="w-4 h-4" />
                         </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-blue-50 flex justify-end">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white rounded-2xl font-black uppercase tracking-wider text-sm flex items-center gap-3 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:-translate-y-1 active:scale-95">
                  <ShoppingCart className="w-5 h-5" />
                  Add All To Cart
                </button>
              </div>

            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
