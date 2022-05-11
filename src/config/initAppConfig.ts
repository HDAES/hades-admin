import { useAppStore } from '@/store/modules/app'

export function initAppConfigStore() {
  const appStore = useAppStore()

  const darkMode = appStore.getDarkMode

  console.log(darkMode)
}
