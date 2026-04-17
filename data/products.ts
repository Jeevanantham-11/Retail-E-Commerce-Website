export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  intentTags: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Pro Whey Protein",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Premium whey isolate for rapid muscle recovery and growth.",
    category: "Fitness",
    intentTags: ["fitness", "gym", "health", "muscle", "protein"]
  },
  {
    id: "p2",
    name: "Adjustable Dumbbells",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Compact adjustable dumbbells replacing 15 sets of weights.",
    category: "Fitness",
    intentTags: ["fitness", "gym", "workout", "weights", "strength"]
  },
  {
    id: "p3",
    name: "Premium Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Eco-friendly, non-slip yoga mat with alignment lines.",
    category: "Fitness",
    intentTags: ["fitness", "yoga", "stretch", "health", "gym"]
  },
  {
    id: "p4",
    name: "Smartphone Ultra Pro",
    price: 999.00,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Latest 5G smartphone with incredible low-light camera.",
    category: "Electronics",
    intentTags: ["tech", "phone", "mobile", "gadget", "upgrade"]
  },
  {
    id: "p5",
    name: "Noise-Cancelling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Immersive sound with industry-leading active noise cancellation.",
    category: "Electronics",
    intentTags: ["tech", "audio", "music", "student", "study"]
  },
  {
    id: "p6",
    name: "Ergonomic Desk Chair",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Breathable mesh back and adjustable lumbar support.",
    category: "Furniture",
    intentTags: ["student", "work", "office", "study", "desk"]
  },
  {
    id: "p7",
    name: "Minimalist Campus Backpack",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Water-resistant student backpack with a padded laptop sleeve.",
    category: "Accessories",
    intentTags: ["student", "school", "bag", "college", "travel"]
  },
  {
    id: "p8",
    name: "LED Desk Lamp with USB",
    price: 35.50,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Eye-caring light modes, perfect for late-night studying.",
    category: "Electronics",
    intentTags: ["student", "study", "light", "office", "desk"]
  },
  {
    id: "p9",
    name: "Summer Graphic Tee",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Breathable cotton tee featuring an exclusive summer wave design.",
    category: "Apparel",
    intentTags: ["summer", "clothes", "fashion", "beach", "casual"]
  },
  {
    id: "p10",
    name: "Polarized Sunglasses",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Lightweight frames with 100% UV protection and polarized lenses.",
    category: "Accessories",
    intentTags: ["summer", "beach", "sun", "fashion", "travel"]
  },
  {
    id: "p11",
    name: "Gaming Laptop X",
    price: 1299.00,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400&h=400",
    description: "High-performance laptop for ultimate gaming and development.",
    category: "Electronics",
    intentTags: ["gaming", "tech", "laptop", "computer", "student"]
  },
  {
    id: "p12",
    name: "Mechanical Keyboard",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400&h=400",
    description: "Tactile mechanical switches with RGB backlighting.",
    category: "Electronics",
    intentTags: ["gaming", "tech", "keyboard", "student", "typing"]
  }
];
