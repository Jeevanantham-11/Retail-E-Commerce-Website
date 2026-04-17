"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { useIntentStore } from "@/store/useIntentStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addClick = useIntentStore((state) => state.addClick);

  return (
    <Link 
      href={`/product/${product.id}`} 
      onClick={() => addClick(product.id)}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="aspect-square relative w-full overflow-hidden bg-gray-50">
          {/* We use next/image with unoptimized or standard depending on mock URLs */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-gray-900 shadow-sm">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
        <div className="p-5">
          <div className="text-xs font-semibold text-blue-600 mb-1 tracking-wider uppercase">
            {product.category}
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
