 <script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { usePrompts } from '@/composables/usePrompts'
import { useFavoritePrompt } from '@/composables/useFavoritePrompt'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'vue-sonner'
import SharedNavbar from '@/components/shared/SharedNavbar.vue'
import { User, Key, Star, Code2, Loader2, ArrowRight } from 'lucide-vue-next'
import type { FormData, UpdateUserRequest } from '@/types/auth'
import type { UserPrompt } from '@/types/prompt'
import { deletePrompt } from '@/services/prompt'
import { ToastProfileCurrentPasswordError, ToastProfileErrorElimination, ToastProfileRequiredFieldsError, ToastProfileSuccessElimination } from '@/utils/toaster'

const router = useRouter()
const { user, updateMe, isUpdatingMe } = useAuth()
const { prompts, refetch: refetchPrompts } = usePrompts()
const { favourites, toggleFavourite } = useFavoritePrompt()


const formData = ref<FormData>({
  email: user?.email ?? '',
  username: user?.username ?? '',
  full_name: user?.full_name ?? '',
  current_password: '',
  new_password: '',
  confirm_password: ''
})



const isFormValid = computed(() => {
  return (
    formData.value.email &&
    formData.value.username &&
    formData.value.full_name &&
    (!formData.value.new_password || formData.value.new_password === formData.value.confirm_password)
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    toast.error('¡Atención!', ToastProfileRequiredFieldsError)
    return
  }

  if (formData.value.new_password && !formData.value.current_password) {
    toast.error('¡Atención!', ToastProfileCurrentPasswordError)
    return
  }

  try {
    const updateData: UpdateUserRequest = {
      email: formData.value.email,
      username: formData.value.username,
      full_name: formData.value.full_name,
      current_password: formData.value.current_password,
      new_password: formData.value.new_password
    }

    if (!updateData.new_password) {
      delete updateData.new_password
      delete updateData.current_password
    }
    updateMe(updateData)

    formData.value.current_password = ''
    formData.value.new_password = ''
    formData.value.confirm_password = ''

    toast.success('¡Listo!', ToastProfileSuccessElimination)
  } catch (error: unknown) {
    console.error('Error updating profile:', error)
    toast.error('¡Error!', ToastProfileErrorElimination)
  }
}

const getPromptTitle = (prompt: UserPrompt) => {
  if (prompt.title) return prompt.title
  const firstLine = prompt.original_prompt?.split('\n')[0]?.trim()
  return firstLine ? `${firstLine.substring(0, 60)}${firstLine.length > 60 ? '...' : ''}` : 'Sin título'
}

const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const promptToDelete = ref<string | null>(null)


const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  promptToDelete.value = null
}

const navigateToPrompt = (prompt: UserPrompt) => {
  router.push({ path: '/', query: { promptId: prompt.id } })
}

const handleDeletePrompt = async (promptId: string) => {
  if (!promptId) return

  isDeleting.value = true
  try {
    await deletePrompt(promptId)
    await refetchPrompts()
    closeDeleteModal()
    toast.success('¡Listo!', ToastProfileSuccessElimination)
  } catch (error) {
    console.error('Error deleting prompt:', error)
    toast.error('¡Error!', ToastProfileErrorElimination)
  } finally {
    isDeleting.value = false
  }
}


onMounted(() => {
  if (user) {
    formData.value = {
      ...formData.value,
      email: user.email ?? '',
      username: user.username ?? '',
      full_name: user.full_name ?? ''
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-background font-sans">
    <SharedNavbar />

    <div class="container mx-auto py-8 px-4 max-w-4xl">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-chart-3 bg-clip-text text-transparent font-heading font-serif">
            Mi Perfil
          </h1>
          <p class="text-muted-foreground mt-1 font-sans">
            Gestiona tu información personal y prompts guardados
          </p>
        </div>
      </div>

    <Tabs default-value="profile" class="w-full">
      <TabsList class="grid w-full grid-cols-3 max-w-md mb-8 bg-muted/50 p-1 rounded-xl">
        <TabsTrigger
          value="profile"
          class="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <User class="h-4 w-4" />
          <span>Perfil</span>
        </TabsTrigger>
        <TabsTrigger
          value="prompts"
          class="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <Code2 class="h-4 w-4" />
          <span>Mis Prompts</span>
        </TabsTrigger>
        <TabsTrigger
          value="favorites"
          class="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <Star class="h-4 w-4" />
          <span>Favoritos</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" class="animate-fade-in">
        <Card class="border-border/50 shadow-sm overflow-hidden">
          <CardHeader class="bg-gradient-to-r from-card to-card/80 border-b border-border/50">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-lg bg-accent/10 text-accent">
                <User class="h-5 w-5" />
              </div>
              <div>
                <CardTitle class="text-foreground">Información del perfil</CardTitle>
                <CardDescription class="text-sm">
                  Actualiza tu información personal y configuración de cuenta
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-6 space-y-6">
            <div class="space-y-1">
              <h3 class="text-lg font-medium text-foreground font-serif">Información personal</h3>
              <p class="text-sm text-muted-foreground font-sans">
                Actualiza tu información de contacto y preferencias personales.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground/90 font-sans" for="full_name">
                  Nombre completo
                </label>
                <Input
                  id="full_name"
                  v-model="formData.full_name"
                  placeholder="Tu nombre completo"
                  class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                  autocomplete="name"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground/90 font-sans" for="username">
                  Nombre de usuario
                </label>
                <Input
                  id="username"
                  v-model="formData.username"
                  placeholder="nombreusuario"
                  class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                  autocomplete="username"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground/90 font-sans" for="email">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  v-model="formData.email"
                  placeholder="tucorreo@ejemplo.com"
                  class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="pt-6 mt-6 border-t border-border/50">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Key class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-lg font-medium text-foreground font-serif">Seguridad</h3>
                  <p class="text-sm text-muted-foreground font-sans">
                    Actualiza tu contraseña para mantener tu cuenta segura.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-foreground/90 font-sans" for="current_password">
                    Contraseña actual
                  </label>
                  <Input
                    id="current_password"
                    type="password"
                    v-model="formData.current_password"
                    placeholder="••••••••"
                    class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                    autocomplete="current-password"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-foreground/90 font-sans" for="new_password">
                    Nueva contraseña
                  </label>
                  <Input
                    id="new_password"
                    type="password"
                    v-model="formData.new_password"
                    placeholder="••••••••"
                    class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                    autocomplete="new-password"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-foreground/90 font-sans" for="confirm_password">
                    Confirmar nueva contraseña
                  </label>
                  <Input
                    id="confirm_password"
                    type="password"
                    v-model="formData.confirm_password"
                    placeholder="••••••••"
                    class="h-10 bg-background/50 border-border/50 hover:border-border focus-visible:ring-2 focus-visible:ring-accent/50"
                    autocomplete="new-password"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end p-6 pt-0">
            <Button
              @click="handleSubmit"
              :disabled="!isFormValid || isUpdatingMe"
              class="px-6 h-10 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-accent to-blue-600 hover:from-accent/90 hover:to-blue-600/90 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
            >
              <Loader2 v-if="isUpdatingMe" class="h-4 w-4 animate-spin" />
              {{ isUpdatingMe ? 'Guardando...' : 'Guardar cambios' }}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="prompts" class="animate-fade-in">
        <Card class="border-border/50 shadow-sm overflow-hidden">
          <CardHeader class="bg-gradient-to-r from-card to-card/80 border-b border-border/50">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <Code2 class="h-5 w-5" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-foreground font-sans">Mis Prompts</h3>
                <CardDescription class="text-sm font-sans">
                  Gestiona y revisa todos tus prompts guardados
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent class="p-6">
            <div v-if="prompts && prompts.length > 0" class="space-y-4">
              <div
                v-for="prompt in prompts"
                :key="prompt.id"
                class="p-4 border rounded-xl bg-card/50 hover:bg-muted/30 transition-colors duration-200 border-border/50 group"
              >
                <div class="flex justify-between items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start gap-2">
                      <h3 class="font-medium text-foreground group-hover:text-accent transition-colors duration-200 truncate">
                        {{ getPromptTitle(prompt) }}
                      </h3>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">
                      Creado el {{ new Date(prompt.created_at).toLocaleDateString() }}
                    </p>
                    <p class="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {{ prompt.original_prompt || 'Sin contenido' }}
                    </p>
                  </div>
                </div>
                <p class="mt-3 text-sm text-foreground/90">
                  {{ prompt.optimized_prompt || prompt.original_prompt }}
                </p>
                <div class="mt-3 pt-3 border-t border-border/20 flex items-center justify-between">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground font-mono">
                    {{ prompt.total_tokens }} tokens
                  </span>
                  <div class="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-foreground/60 hover:text-foreground hover:bg-muted/50"
                      @click.stop="() => navigateToPrompt(prompt)"
                      title="Abrir en el editor"
                    >
                      <ArrowRight class="h-4 w-4 mr-1" />
                      Abrir
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-destructive hover:bg-destructive/10"
                      @click.stop="() => handleDeletePrompt(prompt.id)"
                      title="Eliminar prompt"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-12">
              <div class="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Code2 class="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 class="text-lg font-medium text-foreground mb-2">Aún no tienes prompts</h3>
              <p class="text-muted-foreground mb-6 max-w-md mx-auto">
                Los prompts que guardes aparecerán aquí para que puedas gestionarlos fácilmente.
              </p>
              <Button
                @click="$router.push('/')"
                class="px-6 h-10 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-accent to-blue-600 hover:from-accent/90 hover:to-blue-600/90 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 mx-auto"
              >
                Crear mi primer prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="favorites" class="animate-fade-in">
        <Card class="border-border/50 shadow-sm overflow-hidden">
          <CardHeader class="bg-gradient-to-r from-card to-card/80 border-b border-border/50">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-500">
                <Star class="h-5 w-5 fill-yellow-500" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-foreground font-sans">Mis Favoritos</h3>
                <CardDescription class="text-sm font-sans">
                  Aquí puedes ver todos los prompts que has marcado como favoritos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-6">
            <div v-if="favourites.length === 0" class="text-center py-12">
              <div class="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Star class="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 class="text-lg font-medium text-foreground mb-2">No hay favoritos</h3>
              <p class="text-muted-foreground mb-6 max-w-md mx-auto">
                Los prompts que marques como favoritos aparecerán aquí para un acceso rápido.
              </p>
              <Button
                @click="router.push('/prompts')"
                class="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
              >
                Explorar prompts
              </Button>
            </div>
            <div v-else class="space-y-6">
              <div
                v-for="prompt in favourites"
                :key="prompt.id"
                class="p-4 border rounded-xl bg-card/50 hover:bg-muted/30 transition-colors duration-200 border-border/50 group"
              >
                <div class="flex justify-between items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start gap-2">
                      <h3 class="font-medium text-foreground group-hover:text-accent transition-colors duration-200 truncate">
                        {{ getPromptTitle(prompt) }}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-7 w-7 text-yellow-500 hover:bg-yellow-500/10 shrink-0"
                        @click="() => toggleFavourite(prompt.id, false)"
                        :title="'Quitar de favoritos'"
                      >
                        <Star class="h-3.5 w-3.5 fill-current" />
                      </Button>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">
                      Creado el {{ new Date(prompt.created_at).toLocaleDateString() }}
                    </p>
                    <p class="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {{ prompt.original_prompt || 'Sin contenido' }}
                    </p>
                  </div>
                </div>
                <p class="mt-3 text-sm text-foreground/90">
                  {{ prompt.optimized_prompt || prompt.original_prompt }}
                </p>
                <div class="mt-3 pt-3 border-t border-border/20 flex items-center justify-between">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground font-mono">
                    {{ prompt.total_tokens }} tokens
                  </span>
                  <div class="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-foreground/60 hover:text-foreground hover:bg-muted/50"
                      @click.stop="() => navigateToPrompt(prompt)"
                      title="Abrir en el editor"
                    >
                      <ArrowRight class="h-4 w-4 mr-1" />
                      Abrir
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-destructive hover:bg-destructive/10"
                      @click.stop="() => handleDeletePrompt(prompt.id)"
                      title="Eliminar prompt"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.tabs-trigger[data-state='active']) {
  color: var(--color-accent);
}

:deep(.tabs-trigger[data-state='active']:hover) {
  color: var(--color-accent);
}
</style>
