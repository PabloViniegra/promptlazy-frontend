<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { Sun as SunIcon, Moon as MoonIcon, ChevronDownIcon, User, LogOut, Github as GithubIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import MainLogo from '@/components/icons/MainLogo.vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const router = useRouter()
const { me, isAuthenticated, logout } = useAuth()

const Sun = SunIcon
const Moon = MoonIcon

const isDark = ref<boolean>(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const goToAccess = () => {
  router.push('/access')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
<template>
  <nav
    class="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-sm"
  >
    <router-link
      to="/"
      class="flex items-center space-x-3 group relative overflow-hidden p-1.5 rounded-lg transition-all duration-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
    >
      <div class="relative">
        <MainLogo class="size-10 text-accent dark:text-accent transition-transform duration-500 group-hover:rotate-12" />
        <div class="absolute inset-0 rounded-full bg-accent/10 dark:bg-accent/20 -z-10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      </div>
      <div class="flex flex-col items-start overflow-hidden">
        <span class="text-2xl font-bold bg-gradient-to-r from-accent to-chart-3 dark:from-accent dark:to-chart-3 bg-clip-text text-transparent font-heading">
          PromptLazy
        </span>
        <span class="text-xs text-muted-foreground font-mono tracking-wider">AI Prompt Builder</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </router-link>
    <div class="flex items-center space-x-2">
      <a
        href="https://github.com/PabloViniegra/promptlazy-frontend"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-md hover:bg-secondary transition-colors duration-200 group relative overflow-hidden"
        aria-label="Ver en GitHub"
      >
        <GithubIcon class="h-5 w-5 text-foreground group-hover:text-accent transition-colors duration-200" />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </a>
      <button @click="toggleTheme" class="p-2 rounded-md hover:bg-secondary transition-colors duration-200 group relative overflow-hidden">
        <component :is="isDark ? Sun : Moon" class="h-5 w-5 group-hover:text-accent transition-colors duration-200" />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
      <template v-if="isAuthenticated">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              class="flex items-center space-x-2 group relative overflow-hidden px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div class="relative">
                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                  {{ me?.username?.charAt(0).toUpperCase() }}
                </div>
                <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
              </div>

              <div class="flex flex-col items-start">
                <span class="text-sm font-medium text-foreground">{{ me?.username }}</span>
                <span class="text-xs text-muted-foreground">Usuario</span>
              </div>
              <ChevronDownIcon class="h-4 w-4 ml-2 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            class="w-56 p-2 rounded-xl shadow-lg border border-border/50 bg-card/95 backdrop-blur-sm"
            :side-offset="8"
          >
            <div class="px-2 py-1.5 mb-1">
              <p class="text-sm font-medium">{{ me?.username }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ me?.email || 'usuario@ejemplo.com' }}</p>
            </div>

            <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent my-1.5"></div>

            <DropdownMenuItem class="flex items-center px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-muted/50 transition-colors duration-150 focus:bg-muted/50" @click="router.push('/profile')">
              <User class="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              @click="logout"
              class="flex items-center px-3 py-2 rounded-lg text-sm cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors duration-150"
            >
              <LogOut class="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
      <template v-else>
        <Button @click="goToAccess" class="font-mono">Acceso</Button>
      </template>
    </div>
  </nav>
</template>
