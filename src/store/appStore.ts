import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { POI } from '@/data/pois';

interface AppState {
  // POI selection
  selectedPoi: POI | null;
  setSelectedPoi: (poi: POI | null) => void;
  
  // Audio player
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentAudioSrc: string | null;
  setCurrentAudioSrc: (src: string | null) => void;
  
  // Quiz
  quizBestScore: number;
  setQuizBestScore: (score: number) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // POI selection
      selectedPoi: null,
      setSelectedPoi: (poi) => set({ selectedPoi: poi }),
      
      // Audio player
      isPlaying: false,
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      currentAudioSrc: null,
      setCurrentAudioSrc: (src) => set({ currentAudioSrc: src }),
      
      // Quiz
      quizBestScore: 0,
      setQuizBestScore: (score) => set({ quizBestScore: score }),
      
      // Theme
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'logrono-1915-storage',
      partialize: (state) => ({ 
        quizBestScore: state.quizBestScore,
        isDarkMode: state.isDarkMode 
      }),
    }
  )
);
