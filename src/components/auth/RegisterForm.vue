<script setup lang="ts">
import { reactive } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

const { register, isRegistering } = useAuth()
const form = reactive({ email: '', password: '', name: '', username: '' })

async function onRegister() {
  await register({
    email: form.email,
    password: form.password,
    full_name: form.name,
    username: form.username,
  })
}
</script>
<template>
  <form @submit.prevent="onRegister" class="space-y-5 font-sans">
    <div class="space-y-1.5">
      <Label for="name-register" class="text-sm font-medium text-foreground">
        Nombre Completo
      </Label>
      <div class="relative">
        <Input
          id="name-register"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2.5 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          placeholder="Tu nombre completo"
          autocomplete="name"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-1.5">
      <Label for="username-register" class="text-sm font-medium text-foreground">
        Nombre de usuario
      </Label>
      <div class="relative">
        <Input
          id="username-register"
          v-model="form.username"
          type="text"
          required
          class="w-full px-4 py-2.5 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          placeholder="nombreusuario"
          autocomplete="username"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-1.5">
      <Label for="email-register" class="text-sm font-medium text-foreground">
        Correo electrónico
      </Label>
      <div class="relative">
        <Input
          id="email-register"
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
        <Label for="password-register" class="text-sm font-medium text-foreground">
          Contraseña
        </Label>
        <span class="text-xs text-muted-foreground">Mínimo 8 caracteres</span>
      </div>
      <div class="relative">
        <Input
          id="password-register"
          v-model="form.password"
          type="password"
          required
          minlength="8"
          class="w-full px-4 py-2.5 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          placeholder="••••••••"
          autocomplete="new-password"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-2 mt-2">
        <div class="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>

    <div class="pt-2">
      <Button
        type="submit"
        class="w-full py-2.5 px-4 text-sm font-medium rounded-lg bg-gradient-to-r from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center h-11"
        :disabled="isRegistering"
      >
        <LoaderIcon v-if="isRegistering" :className="'animate-spin size-5 mr-2 text-white'" />
        <span class="font-semibold">{{ isRegistering ? 'Creando cuenta...' : 'Crear cuenta' }}</span>
      </Button>
    </div>

    <p class="text-xs text-center text-slate-500 dark:text-slate-400">
      Al registrarte, aceptas nuestros
      <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Términos de servicio</a> y
      <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Política de privacidad</a>.
    </p>
  </form>
</template>
