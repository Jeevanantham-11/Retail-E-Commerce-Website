import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dominantIntent } = body;

    if (!dominantIntent || dominantIntent === "neutral") {
      return NextResponse.json({ bundle: [], explanation: "" });
    }

    // AI Bundle Generator Logic
    // Step 1: Filter products that match the dominant intent
    const matchedProducts = products.filter(p => 
      p.intentTags.includes(dominantIntent)
    );

    // Step 2: Grab the first 3 (simulate a bundle)
    const bundle = matchedProducts.slice(0, 3);

    // Step 3: Explainable AI Logic
    let explanationString = "";
    if (dominantIntent === "fitness") {
      explanationString = "This smart bundle was curated because your recent searches and clicks strongly match fitness and gym-related behavior. Users with similar goals bought these to accelerate their workouts.";
    } else if (dominantIntent === "gaming") {
      explanationString = "We generated this gaming bundle because you've been exploring high-performance tech. These items are frequently bought together to build the ultimate gaming setup.";
    } else if (dominantIntent === "student") {
      explanationString = "Because you viewed productivity and study-related items, our AI selected this ergonomic and functional toolset designed specifically for students and remote workers.";
    } else if (dominantIntent === "summer") {
      explanationString = "We noticed your intent shifting towards summer gear. Here is a hand-picked layout of our top-rated seasonal items to get you beach-ready.";
    }

    return NextResponse.json({
      bundle,
      explanation: explanationString
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate bundle" }, { status: 500 });
  }
}
