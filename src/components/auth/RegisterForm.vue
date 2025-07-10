<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
import PolicyConditions from '@/components/shared/PolicyConditions.vue'

const { register, isRegistering } = useAuth()
const form = reactive({ email: '', password: '', name: '', username: '' })

const passwordStrength = computed(() => {
  const password = form.password
  if (!password) return { score: 0, feedback: '' }

  let score = 0
  const feedback = []

  if (password.length >= 8) score++

  if (/[a-z]/.test(password)) score++

  if (/[A-Z]/.test(password)) score++

  if (/[0-9]/.test(password)) score++

  if (/[^A-Za-z0-9]/.test(password)) score++

  if (password.length < 8) {
    feedback.push('Mínimo 8 caracteres')
  } else {
    if (!/[a-z]/.test(password)) feedback.push('Incluye minúsculas')
    if (!/[A-Z]/.test(password)) feedback.push('Incluye mayúsculas')
    if (!/[0-9]/.test(password)) feedback.push('Incluye números')
    if (!/[^A-Za-z0-9]/.test(password)) feedback.push('Incluye caracteres especiales')
  }

  return {
    score: Math.min(4, Math.max(0, score - 1)),
    feedback: feedback.length > 0 ? feedback.join(' • ') : 'Contraseña fuerte'
  }
})

const getStrengthColor = (index: number) => {
  if (passwordStrength.value.score === 0) return 'bg-slate-200 dark:bg-slate-700'
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500'
  ]
  return index < passwordStrength.value.score
    ? colors[passwordStrength.value.score - 1]
    : 'bg-slate-200 dark:bg-slate-700'
}

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

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
  <div class="space-y-5">
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
        <div class="relative">
          <Input
            id="password-register"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            minlength="8"
            class="w-full px-4 py-2.5 pr-10 text-sm rounded-lg border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          >
            <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        <div class="mt-3">
          <div class="grid grid-cols-4 gap-2 mb-1">
            <div
              v-for="i in 4"
              :key="i"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="getStrengthColor(i - 1)"
            ></div>
          </div>
          <p
            class="text-xs mt-1 h-4 transition-all duration-300"
            :class="{
              'text-red-500': passwordStrength.score <= 1 && form.password.length > 0,
              'text-orange-500': passwordStrength.score === 2,
              'text-yellow-500': passwordStrength.score === 3,
              'text-green-500': passwordStrength.score >= 4,
              'text-muted-foreground': form.password.length === 0
            }"
          >
            {{ form.password.length > 0 ? passwordStrength.feedback : 'Mínimo 8 caracteres' }}
          </p>
        </div>
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

    </form>
    <div class="mt-6 text-center">
      <p class="text-sm text-muted-foreground font-sans">
        Al registrarte, aceptas nuestros
        <PolicyConditions class="relative font-medium text-primary hover:text-primary/90 transition-colors duration-200 after:content-[''] after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:w-full after:transition-all after:duration-200" />
      </p>
    </div>
  </div>
</template>
