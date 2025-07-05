<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import MainLogo from '@/components/icons/MainLogo.vue'
import { useTheme } from '@/composables/useTheme'
import { Sun, Moon } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden font-sans">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl opacity-70"></div>
      <div class="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-chart-3/10 blur-3xl opacity-50"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-chart-5/10 blur-3xl opacity-30"></div>
    </div>
    <div class="w-full max-w-md relative z-10">
      <button
        @click="toggleTheme"
        class="absolute top-4 right-4 p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <component :is="isDark ? Sun : Moon" class="h-5 w-5" />
      </button>

      <div class="text-center mb-10">
        <div class="mx-auto w-24 h-24 mb-6 rounded-2xl backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700/50 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <MainLogo class="h-12 w-12 text-foreground dark:text-foreground" />
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-accent to-chart-3 dark:from-accent dark:to-chart-3 bg-clip-text text-transparent mb-2 font-heading">
          PromptLazy
        </h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Convierte tus ideas en prompts profesionales con IA
        </p>
      </div>
      <div class="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
        <Tabs default-value="login" class="w-full">
          <TabsList class="w-full flex bg-transparent p-0 h-auto">
            <TabsTrigger
              value="login"
              class="flex-1 py-4 text-sm font-medium text-center relative group"
              active-class="text-accent dark:text-accent"
            >
              <span class="relative z-10">Iniciar sesión</span>
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 group-data-[state=active]:bg-accent dark:group-data-[state=active]:bg-accent transition-colors"></span>
            </TabsTrigger>
            <TabsTrigger
              value="register"
              class="flex-1 py-4 text-sm font-medium text-center relative group"
              active-class="text-accent dark:text-accent"
            >
              <span class="relative z-10">Crear cuenta</span>
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 group-data-[state=active]:bg-accent dark:group-data-[state=active]:bg-accent transition-colors"></span>
            </TabsTrigger>
          </TabsList>

          <div class="px-6 pb-8 pt-6">
            <TabsContent value="login" class="m-0">
              <LoginForm :onSuccess="goHome" />
            </TabsContent>
            <TabsContent value="register" class="m-0">
              <RegisterForm :onSuccess="goHome" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <p class="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © 2025 PromptLazy. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>
