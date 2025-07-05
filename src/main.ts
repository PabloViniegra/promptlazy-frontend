import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/authStore'

async function initAuth() {
  const auth = useAuthStore()
  if (auth.refreshToken) {
    try {
      await auth.refreshTokenAction()
      await auth.fetchMe()
    } catch {
      auth.logout()
    }
  }
}

async function bootstrap() {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(VueQueryPlugin)
  await initAuth()

  app.mount('#app')
}

bootstrap()
