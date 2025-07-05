<script setup lang="ts">
import { reactive } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

const { login, isLoging } = useAuth()
const form = reactive({ email: '', password: '' })

async function onLogin() {
  await login({
    email: form.email,
    password: form.password,
  })
}
</script>
<template>
  <form @submit.prevent="onLogin" class="space-y-5 font-sans">
    <div class="space-y-1.5">
      <Label for="email-login" class="text-sm font-medium text-foreground">
        Correo electrónico
      </Label>
      <div class="relative">
        <Input
          id="email-login"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2.5 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          placeholder="tucorreo@ejemplo.com"
          autocomplete="email"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <Label for="password-login" class="text-sm font-medium text-foreground">
          Contraseña
        </Label>
        <a href="#" class="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <div class="relative">
        <Input
          id="password-login"
          v-model="form.password"
          type="password"
          required
          class="w-full px-4 py-2.5 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          placeholder="••••••••"
          autocomplete="current-password"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="pt-2">
      <Button
        type="submit"
        class="w-full py-2.5 px-4 text-sm font-medium rounded-lg bg-gradient-to-r from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center h-11"
        :disabled="isLoging"
      >
        <LoaderIcon v-if="isLoging" :className="'animate-spin size-5 mr-2 text-white'" />
        <span class="font-semibold">{{ isLoging ? 'Iniciando sesión...' : 'Iniciar sesión' }}</span>
      </Button>
    </div>
  </form>
</template>
