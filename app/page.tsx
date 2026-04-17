import { products } from "@/data/products";
import ProductCard from "@/components/commerce/ProductCard";
import SearchBar from "@/components/commerce/SearchBar";
import DynamicBundle from "@/components/ai/DynamicBundle";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Intent-Driven Platform</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Discover products tailored <br className="hidden md:block" /> to your lifestyle.
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Explore our collection. As you browse, our AI engine will intelligently learn your intent and build customized bundles.
        </p>

        <SearchBar />
      </section>

      {/* AI Smart Cart Banner */}
      <DynamicBundle />

      {/* Main Product Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
