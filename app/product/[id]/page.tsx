import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="md:w-1/2 aspect-square relative rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wider uppercase">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-medium">1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-medium">Free Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
