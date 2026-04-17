import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/products";

// Define the valid intent types based on our dataset
export type IntentType = "fitness" | "gaming" | "student" | "summer" | "neutral";

interface IntentScores {
  fitness: number;
  gaming: number;
  student: number;
  summer: number;
}

interface IntentState {
  scores: IntentScores;
  dominantIntent: IntentType;
  history: { type: "search" | "click"; value: string; timestamp: number }[];
  
  // Actions
  addSearch: (query: string) => void;
  addClick: (productId: string) => void;
  resetIntent: () => void;
  calculateDominantIntent: () => void;
}

export const useIntentStore = create<IntentState>()(
  persist(
    (set, get) => ({
      scores: { fitness: 0, gaming: 0, student: 0, summer: 0 },
      dominantIntent: "neutral",
      history: [],

      addSearch: (query: string) => {
        const q = query.toLowerCase();
        set((state) => {
          const newScores = { ...state.scores };
          // Simple keyword matching logic simulating an NLP intent classifier
          if (q.includes("gym") || q.includes("protein") || q.includes("yoga") || q.includes("fit")) newScores.fitness += 2;
          if (q.includes("game") || q.includes("laptop") || q.includes("keyboard") || q.includes("tech")) newScores.gaming += 2;
          if (q.includes("study") || q.includes("desk") || q.includes("book") || q.includes("student")) newScores.student += 2;
          if (q.includes("summer") || q.includes("beach") || q.includes("sun") || q.includes("hot")) newScores.summer += 2;

          return {
            scores: newScores,
            history: [...state.history, { type: "search" as const, value: query, timestamp: Date.now() }].slice(-20) // keep last 20
          };
        });
        get().calculateDominantIntent();
      },

      addClick: (productId: string) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        set((state) => {
          const newScores = { ...state.scores };
          // Add 1 point for every intent tag the product matches
          product.intentTags.forEach((tag) => {
            if (tag === "fitness" || tag === "gym" || tag === "muscle" || tag === "yoga") newScores.fitness += 1;
            if (tag === "gaming" || tag === "tech" || tag === "laptop" || tag === "keyboard") newScores.gaming += 1;
            if (tag === "student" || tag === "study" || tag === "school" || tag === "desk") newScores.student += 1;
            if (tag === "summer" || tag === "beach" || tag === "sun") newScores.summer += 1;
          });

          return {
            scores: newScores,
            history: [...state.history, { type: "click" as const, value: productId, timestamp: Date.now() }].slice(-20)
          };
        });
        get().calculateDominantIntent();
      },

      calculateDominantIntent: () => {
        set((state) => {
          const { fitness, gaming, student, summer } = state.scores;
          const maxScore = Math.max(fitness, gaming, student, summer);
          
          let newDominant: IntentType = "neutral";
          
          if (maxScore > 0) { // Require at least some interaction to shift from neutral
            if (fitness === maxScore) newDominant = "fitness";
            else if (gaming === maxScore) newDominant = "gaming";
            else if (student === maxScore) newDominant = "student";
            else if (summer === maxScore) newDominant = "summer";
          }
          
          return { dominantIntent: newDominant };
        });
      },

      resetIntent: () => {
        set({
          scores: { fitness: 0, gaming: 0, student: 0, summer: 0 },
          dominantIntent: "neutral",
          history: [],
        });
      }
    }),
    {
      name: "idacs-intent-storage", // stores in localStorage
    }
  )
);
