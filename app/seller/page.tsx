"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Package, Percent, Bot } from "lucide-react";

export default function SellerDashboard() {
  const [basePrice, setBasePrice] = useState<number>(100);
  const [discount, setDiscount] = useState<number>(10);
  const [baseDemand, setBaseDemand] = useState<number>(500);

  // Simulation State
  const [baseRevenue, setBaseRevenue] = useState(0);
  const [newDemand, setNewDemand] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newRevenue, setNewRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);

  useEffect(() => {
    // Model Math
    // Note: Ensuring numbers are at least 0 to prevent bizarre edge cases.
    const validPrice = Math.max(0, basePrice || 0);
    const validDiscount = Math.max(0, discount || 0);
    const validDemand = Math.max(0, baseDemand || 0);

    const initialRev = validPrice * validDemand;
    
    // Elasticity multiplier: 1% discount = 1.5% demand increase
    const demandIncreasePct = validDiscount * 1.5;
    const computedDemand = Math.round(validDemand * (1 + demandIncreasePct / 100));
    const computedPrice = validPrice * (1 - validDiscount / 100);
    
    const computedRevenue = computedPrice * computedDemand;

    setBaseRevenue(initialRev);
    setNewDemand(computedDemand);
    setNewPrice(computedPrice);
    setNewRevenue(computedRevenue);
    setRevenueChange(computedRevenue - initialRev);
  }, [basePrice, discount, baseDemand]);

  // AI Insight Generator
  const generateInsight = () => {
    if (discount === 0) return "Simulation pending. Adjust the discount slider to see predictions.";
    
    if (revenueChange > 0) {
      return `Positive Outlook: A ${discount}% discount triggers a ${Math.round(discount * 1.5)}% spike in demand. The volume increase perfectly offsets the lower margin, netting you an extra $${revenueChange.toLocaleString(undefined, { maximumFractionDigits: 0 })} in revenue.`;
    } else if (revenueChange < 0) {
      return `Warning: While demand increases to ${newDemand} units, the ${discount}% cut is too deep. You will lose $${Math.abs(revenueChange).toLocaleString(undefined, { maximumFractionDigits: 0 })} overall. Consider a smaller discount strategy.`;
    } else {
      return `Breakeven: The increased volume exactly offsets your margin loss. No net revenue change.`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-6 tracking-wide shadow-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Professional Seller Toolkit</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 mt-2 relative">
          Simulation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Engine</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Leverage our predictive elasticity model. Tune your discounts and visualize the cascading effect on demand and gross revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Controls Section */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-gray-900">Variables</h2>
            <p className="text-sm text-gray-500 font-medium">Drag or type to simulate</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-blue-500" /> Base Price ($)
            </label>
            <input 
              type="number" 
              value={basePrice === 0 ? "" : basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-lg transition-all"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
                <Percent className="w-4 h-4 text-orange-500" /> Discount Strategy
              </label>
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-black shadow-sm">
                {discount}%
              </div>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
              <Package className="w-4 h-4 text-emerald-500" /> Expected Base Demand
            </label>
            <input 
              type="number" 
              value={baseDemand === 0 ? "" : baseDemand}
              onChange={(e) => setBaseDemand(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-bold text-lg transition-all"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-center relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-gray-400 font-bold mb-6 text-xs uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300 border-2 border-gray-200 block" />
                Baseline Trajectory
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Gross Revenue</div>
                  <div className="text-4xl font-black text-gray-900 tracking-tight">${baseRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div>
                   <div className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Volume Velocity</div>
                   <div className="text-lg font-bold text-gray-700 bg-gray-50 inline-block px-3 py-1 rounded-lg border border-gray-100">{baseDemand.toLocaleString()} units @ ${basePrice}</div>
                </div>
              </div>
            </div>

            {/* After Card (Animated) */}
            <motion.div 
              className={`p-8 rounded-[2rem] border-2 relative overflow-hidden shadow-lg ${revenueChange >= 0 ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200 shadow-emerald-500/10" : "bg-gradient-to-br from-rose-50 to-orange-50/50 border-rose-200 shadow-rose-500/10"}`}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              key={discount}
            >
               <h3 className={`font-bold mb-6 text-xs uppercase tracking-[0.2em] relative z-10 flex items-center gap-2 ${revenueChange >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                 <span className={`w-2 h-2 rounded-full border-2 block ${revenueChange >= 0 ? "bg-emerald-400 border-emerald-300 animate-pulse" : "bg-rose-400 border-rose-300 animate-pulse"}`} />
                 Simulation Reality
               </h3>
               
               <div className="space-y-6 relative z-10">
                <div>
                  <div className={`text-xs font-bold mb-1.5 uppercase tracking-wider ${revenueChange >= 0 ? "text-emerald-700/60" : "text-rose-700/60"}`}>
                    Predicted Revenue
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`text-4xl font-black tracking-tight ${revenueChange >= 0 ? "text-emerald-900" : "text-rose-900"}`}>
                      ${newRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    {revenueChange !== 0 && (
                      <span className={`text-sm font-bold px-3 py-1.5 flex items-center gap-1.5 rounded-xl shadow-sm ${revenueChange > 0 ? "bg-white text-emerald-600 border border-emerald-100" : "bg-white text-rose-600 border border-rose-100"}`}>
                        {revenueChange > 0 ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
                        ${Math.abs(revenueChange).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                   <div className={`text-xs font-bold mb-1.5 uppercase tracking-wider ${revenueChange >= 0 ? "text-emerald-700/60" : "text-rose-700/60"}`}>
                     Projected Volume
                   </div>
                   <div className={`text-lg font-bold inline-block px-3 py-1 rounded-lg border ${revenueChange >= 0 ? "text-emerald-800 bg-emerald-100/50 border-emerald-200/50" : "text-rose-800 bg-rose-100/50 border-rose-200/50"}`}>
                     {newDemand.toLocaleString()} units @ ${newPrice.toFixed(2)}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Explainable AI Insight */}
          <div className="mt-auto pt-8 bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 text-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden border border-blue-100">
             {/* Abstract background graphics */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-60"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-60"></div>
             
             <div className="absolute top-1/2 right-0 -translate-y-1/2 p-8 opacity-[0.03]">
                <Bot className="w-48 h-48 text-blue-900" />
             </div>
             
             <div className="relative z-10">
               <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-full mb-6 text-xs uppercase tracking-widest shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  AI Simulation Analysis
               </div>
               <motion.p 
                 key={revenueChange}
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ type: "spring", bounce: 0.5 }}
                 className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed max-w-2xl"
               >
                 {generateInsight()}
               </motion.p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
