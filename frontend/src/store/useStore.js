import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  userRole: 'student', // voter, candidate, student
  setUserRole: (role) => set({ userRole: role }),
  
  complexity: 'intermediate', // beginner, intermediate, advanced
  setComplexity: (level) => set({ complexity: level }),

  chatHistory: [],
  addMessage: (msg) => set((state) => {
    const newHistory = [...state.chatHistory, msg];
    // Keep only last 5 contexts for memory if needed (here we keep all for UI, but could slice for API)
    return { chatHistory: newHistory };
  }),
  clearChat: () => set({ chatHistory: [] }),
}));
