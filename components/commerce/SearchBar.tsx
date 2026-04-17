"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import { useIntentStore } from "@/store/useIntentStore";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const addSearch = useIntentStore((state) => state.addSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearch(query);
      // We don't perform a real search for the MVP, 
      // we just clear it to feel like a real interaction or show a generic UI.
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center bg-white rounded-full border border-gray-200 shadow-sm focus-within:shadow-md focus-within:border-blue-300 transition-all">
        <Search className="w-5 h-5 text-gray-400 absolute left-4" />
        <input
          type="text"
          placeholder="Search for fitness, tech, or summer gear..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-transparent outline-none rounded-full text-gray-900 placeholder-gray-400"
        />
        <button 
          type="submit"
          className="mr-2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
