import 'virtual:svg-icons-register'
import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
import { initAppConfigStore } from '@/config/initAppConfig'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  initAppConfigStore()

  app.mount('#app')
}

bootstrap()
