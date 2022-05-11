import { darkMode } from '@/config/website'
import type { DarkMode } from '@/config/website'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'App',
  state: () => ({
    darkMode: undefined
  }),
  getters: {
    getDarkMode(): DarkMode {
      return this.darkMode || localStorage.getItem('vueuse-color-scheme') || darkMode
    }
  }
})
