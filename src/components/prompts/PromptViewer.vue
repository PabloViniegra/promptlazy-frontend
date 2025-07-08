<script setup lang="ts">
import { computed, h, ref, toRef } from 'vue'
import { Copy, Sparkles, Pencil, Trash2, MessageSquare, Star, Info, Check, Loader2 } from 'lucide-vue-next'
import { getPrompt } from '@/services/prompt'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { formatOptimizedPrompt } from '@/utils/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePrompt } from '@/composables/usePrompt'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'
import DeletePromptModal from '@/components/modals/DeletePromptModal.vue'
import type { OptimizedPromptSections } from '@/types/prompt'
import { useFavoritePrompt } from '@/composables/useFavoritePrompt'
import { useQueryClient } from '@tanstack/vue-query'
import { usePromptStore } from '@/stores/promptStore'

interface Props {
  promptId: string | null
}
const qc = useQueryClient()
const promptStore = usePromptStore()
const props = defineProps<Props>()
const idRef = toRef(props, 'promptId')
const router = useRouter()
const { prompt, isLoading, deletePrompt, isDeleting, updatePrompt, isUpdating, refetch } = usePrompt(idRef)
const isEditing = ref(false)
const editedPrompt = ref('')
const isOptimizedPromptLoading = ref(false)
const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()
const { toggleFavourite, isToggling } = useFavoritePrompt()


const handleDelete = async () => {
  if (!idRef.value) return

  try {
    await deletePrompt(idRef.value)
    toast.success('¡Listo!', {
      description: 'El prompt ha sido eliminado correctamente',
      duration: 3000,
      style: {
        background: 'hsl(142.1 76.2% 36.3%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
    })
    router.push('/')
  } catch (error) {
    toast.error('¡Ups!', {
      description: 'No se pudo eliminar el prompt. Inténtalo de nuevo.',
      duration: 4000,
      style: {
        background: 'hsl(0 84.2% 60.2%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
    })
    console.error('Error deleting prompt:', error)
  } finally {
    closeDeleteModal()
  }
}

const handleEditClick = () => {
  if (!prompt.value) return
  isEditing.value = true
  editedPrompt.value = prompt.value.original_prompt
}

const handleSaveEdit = async () => {
  if (!prompt.value || !editedPrompt.value.trim()) return

  try {
    // Activar el estado de carga
    isOptimizedPromptLoading.value = true
    
    // Actualizar el prompt original inmediatamente para feedback visual
    promptStore.setCurrentPrompt({
      ...prompt.value,
      original_prompt: editedPrompt.value
    })
    
    // Realizar la actualización en el servidor
    await updatePrompt({
      promptId: prompt.value.id,
      prompt: { prompt: editedPrompt.value }
    })
    
    // Forzar la recarga del prompt optimizado
    await refetch()
    
    // Asegurarse de que tenemos los datos más recientes
    const updatedPrompt = await getPrompt(prompt.value.id)
    if (updatedPrompt) {
      promptStore.setCurrentPrompt(updatedPrompt)
    }

    toast.success('¡Listo!', {
      description: 'El prompt ha sido actualizado correctamente',
      duration: 3000,
      style: {
        background: 'hsl(142.1 76.2% 36.3%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
    })

    isEditing.value = false
    // Pequeño retraso para asegurar que la UI se actualice correctamente
    setTimeout(() => {
      isOptimizedPromptLoading.value = false
    }, 100)
  } catch (error) {
    toast.error('¡Error!', {
      description: 'No se pudo actualizar el prompt. Inténtalo de nuevo.',
      duration: 4000,
      style: {
        background: 'hsl(0 84.2% 60.2%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
    })
    console.error('Error updating prompt:', error)
  }
}

const handleCancelEdit = () => {
  isEditing.value = false
  editedPrompt.value = ''
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    handleSaveEdit()
  } else if (e.key === 'Escape') {
    handleCancelEdit()
  }
}

const handleToggleFavorite = async (promptId: string) => {
  if (!prompt.value) return

  const currentFavoriteState = prompt.value.is_favorite
  const newFavoriteState = !currentFavoriteState

  if (prompt.value) {
    promptStore.setCurrentPrompt({
      ...prompt.value,
      is_favorite: newFavoriteState
    })
  }

  try {
    const success = await toggleFavourite(promptId, newFavoriteState)

    if (!success) {
      if (prompt.value) {
        promptStore.setCurrentPrompt({
          ...prompt.value,
          is_favorite: currentFavoriteState
        })
      }
      throw new Error('No se pudo actualizar el estado de favorito')
    }

    await Promise.all([
      qc.invalidateQueries({ queryKey: ['prompt', promptId] }),
      qc.invalidateQueries({ queryKey: ['prompts'] })
    ])

  } catch (err) {
    console.error('Error al actualizar favorito:', err)
    toast.error('Error', {
      description: 'No se pudo actualizar el estado de favorito',
      duration: 2000,
    })
    if (prompt.value) {
      promptStore.setCurrentPrompt({
        ...prompt.value,
        is_favorite: currentFavoriteState
      })
    }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('¡Copiado!', {
      description: 'El texto se ha copiado al portapapeles',
      duration: 2000,
      class: 'group/toast',
      style: {
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        fontFamily: 'var(--font-sans)',
        borderLeft: '4px solid var(--color-primary)',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-md)',
        background: 'hsl(var(--card))',
        color: 'hsl(var(--card-foreground))',
        border: '1px solid hsl(var(--border))',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
      icon: () => h(Check, { class: 'h-5 w-5 text-green-500' }),
      classes: {
        title: 'font-medium text-foreground flex items-center gap-2',
        description: 'text-sm text-muted-foreground',
        toast:
          'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
      },
    })
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
    toast.error('Error', {
      description: 'No se pudo copiar el texto',
      duration: 2000,
      class: 'group/toast',
      style: {
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        fontFamily: 'var(--font-sans)',
        borderLeft: '4px solid hsl(var(--destructive))',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-md)',
        background: 'hsl(var(--destructive)/0.03)',
        color: 'hsl(var(--destructive))',
        border: '1px solid hsl(var(--destructive)/0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
      classes: {
        title: 'font-medium flex items-center gap-2',
        description: 'text-sm text-muted-foreground/90',
        toast:
          'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
      },
    })
  }
}

const formattedOptimizedPrompt = computed<Partial<OptimizedPromptSections>>(() => {
  return formatOptimizedPrompt(prompt.value?.optimized_prompt)
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6 font-sans">
    <div v-if="!isLoading && prompt" class="flex justify-between items-center mb-6 px-2">
      <h2 class="text-2xl font-bold text-foreground font-heading">Vista de chat</h2>
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          :class="[
            'h-8 px-3 transition-all duration-200 border flex items-center',
            prompt.is_favorite
              ? [
                  'bg-amber-50 dark:bg-amber-900/30',
                  'border-amber-200 dark:border-amber-800/70',
                  'text-amber-600 dark:text-amber-400',
                  'hover:bg-amber-100 dark:hover:bg-amber-900/40',
                  'dark:shadow-sm',
                ]
              : [
                  'bg-transparent',
                  'border-border/60 dark:border-muted/50',
                  'text-muted-foreground/80 dark:text-muted-foreground/70',
                  'hover:bg-muted/50 hover:border-border/80 dark:hover:bg-muted/30 dark:hover:border-muted/60',
                ],
            'group',
            isToggling ? 'opacity-70 cursor-not-allowed' : ''
          ]"
          :disabled="!prompt || isToggling"
          @click.stop="handleToggleFavorite(prompt.id)"
        >
          <template v-if="prompt.is_favorite">
            <template v-if="!isToggling">
              <Star class="size-4 mr-1.5 flex-shrink-0 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
              <span class="font-medium whitespace-nowrap">Favorito</span>
            </template>
            <Loader2 v-else class="h-4 w-4 mr-1.5 animate-spin" />
          </template>
          <template v-else>
            <template v-if="!isToggling">
              <Star class="size-4 mr-1.5 flex-shrink-0 text-muted-foreground/80 dark:text-muted-foreground/70" />
              <span class="whitespace-nowrap">Añadir a favoritos</span>
            </template>
            <Loader2 v-else class="h-4 w-4 mr-1.5 animate-spin" />
          </template>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-8 px-3 transition-colors"
          @click="handleEditClick"
        >
          <Pencil class="size-4 mr-1.5" />
          <span>Editar</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="text-destructive/80 hover:text-destructive hover:bg-destructive/5 h-8 px-3 transition-colors"
          @click="openDeleteModal"
        >
          <Trash2 class="size-4 mr-1.5" />
          <span>Eliminar</span>
        </Button>
      </div>
    </div>
    <template v-if="isLoading">
      <div class="flex justify-between items-center mb-6 px-2">
        <Skeleton class="h-8 w-48 rounded-md bg-muted/40" />
        <div class="flex space-x-2">
          <Skeleton class="h-8 w-32 rounded-md bg-muted/40" />
          <Skeleton class="h-8 w-20 rounded-md bg-muted/40" />
          <Skeleton class="h-8 w-24 rounded-md bg-muted/40" />
        </div>
      </div>
      <Card class="overflow-hidden">
        <CardHeader class="pb-3 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Skeleton class="h-5 w-5 rounded-full bg-muted/40" />
              <Skeleton class="h-5 w-32 rounded-md bg-muted/40" />
            </div>
            <Skeleton class="h-8 w-8 rounded-md bg-muted/40" />
          </div>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-3">
            <Skeleton class="h-4 w-full rounded bg-muted/40" />
            <Skeleton class="h-4 w-5/6 rounded bg-muted/40" />
            <Skeleton class="h-4 w-4/5 rounded bg-muted/40" />
            <Skeleton class="h-4 w-3/4 rounded bg-muted/40" />
          </div>
          <div class="mt-4 space-y-2">
            <Skeleton class="h-4 w-1/2 rounded bg-muted/40" />
          </div>
        </CardContent>
      </Card>
      <Card class="overflow-hidden mt-6">
        <CardHeader class="pb-3 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Skeleton class="h-5 w-5 rounded-full bg-muted/40" />
              <Skeleton class="h-5 w-40 rounded-md bg-muted/40" />
            </div>
            <Skeleton class="h-8 w-8 rounded-md bg-muted/40" />
          </div>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-3">
            <Skeleton class="h-4 w-full rounded bg-muted/40" />
            <Skeleton class="h-4 w-11/12 rounded bg-muted/40" />
            <Skeleton class="h-4 w-10/12 rounded bg-muted/40" />
            <Skeleton class="h-4 w-9/12 rounded bg-muted/40" />
            <Skeleton class="h-4 w-8/12 rounded bg-muted/40" />
          </div>
        </CardContent>
      </Card>
    </template>
    <template v-else-if="prompt">
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="flex items-center gap-2 text-lg font-medium">
              <MessageSquare class="h-5 w-5 text-blue-500" />
              <span>Prompt original</span>
              <Button
                v-if="!isEditing"
                @click="handleEditClick"
                variant="ghost"
                size="icon"
                class="h-7 w-7 ml-1 text-muted-foreground hover:text-foreground"
                :disabled="isUpdating"
              >
                <Pencil class="h-3.5 w-3.5" />
                <span class="sr-only">Editar prompt</span>
              </Button>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-muted-foreground hover:text-foreground"
              @click="copyToClipboard(prompt.original_prompt)"
            >
              <Copy class="h-4 w-4" />
              <span class="sr-only">Copiar al portapapeles</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="isEditing" class="space-y-3">
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg opacity-75 group-hover:opacity-100 transition duration-200 blur-sm"></div>
              <div class="relative bg-background rounded-lg p-0.5">
                <div class="relative">
                  <div class="absolute inset-0.5 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-md"></div>
                  <textarea
                    v-model="editedPrompt"
                    @keydown="handleKeyDown"
                    class="relative w-full min-h-[150px] p-4 rounded-md border border-blue-500/30 bg-background/95 backdrop-blur-sm text-foreground font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors resize-none"
                    :class="{ 'opacity-70': isUpdating }"
                    :disabled="isUpdating"
                    autofocus
                    spellcheck="false"
                    placeholder="Escribe tu prompt aquí..."
                  />
                </div>
                <div class="absolute right-3 bottom-3 flex gap-2 z-10">
                  <Button
                    @click="handleCancelEdit"
                    variant="outline"
                    size="sm"
                    :disabled="isUpdating"
                    class="h-8 text-xs border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
                  >
                    Cancelar
                  </Button>
                  <Button
                    @click="handleSaveEdit"
                    size="sm"
                    :disabled="!editedPrompt.trim() || isUpdating"
                    class="h-8 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-500/20 transition-all"
                  >
                    <span v-if="isUpdating" class="flex items-center">
                      <Loader2 class="mr-2 h-3 w-3 animate-spin" />
                      Guardando...
                    </span>
                    <span v-else class="flex items-center">
                      <Check class="mr-1.5 h-3.5 w-3.5" />
                      Guardar cambios
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between px-1">
              <p class="text-xs text-muted-foreground flex items-center">
                <Info class="h-3 w-3 mr-1.5 text-blue-500" />
                Presiona <kbd class="mx-1 px-1.5 py-0.5 text-xs rounded bg-muted border border-border font-medium">Ctrl + Enter</kbd> para guardar
              </p>
              <span class="text-xs text-muted-foreground">
                {{ editedPrompt.length }}/4000
              </span>
            </div>
          </div>
          <p v-else class="whitespace-pre-wrap text-foreground/90 font-mono text-sm bg-muted/20 p-4 rounded-md">
            {{ prompt.original_prompt }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="flex items-center gap-2 text-lg font-medium">
              <Sparkles class="h-5 w-5 text-amber-500" :class="{ 'animate-pulse': isOptimizedPromptLoading }" />
              <span>Prompt Optimizado</span>
              <span v-if="isOptimizedPromptLoading" class="ml-2 inline-flex items-center gap-1.5 text-xs font-normal text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                <Loader2 class="h-3 w-3 animate-spin" />
                Actualizando...
              </span>
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Copy class="h-4 w-4" />
                  <span class="sr-only">Copiar al portapapeles</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56" align="end">
                <DropdownMenuItem @click="copyToClipboard(prompt.optimized_prompt)">
                  <Copy class="mr-2 h-4 w-4" />
                  <span>Copiar</span>
                </DropdownMenuItem>
                <DropdownMenuItem @click="openDeleteModal" class="text-destructive focus:text-destructive">
                  <Trash2 class="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="isOptimizedPromptLoading" class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Skeleton class="h-4 w-4 rounded-full bg-muted/40" />
                <Skeleton class="h-4 w-32 rounded-md bg-muted/40" />
              </div>
              <Skeleton class="h-24 w-full rounded-lg bg-muted/40" />
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Skeleton class="h-4 w-4 rounded-full bg-muted/40" />
                <Skeleton class="h-4 w-40 rounded-md bg-muted/40" />
              </div>
              <Skeleton class="h-32 w-full rounded-lg bg-muted/40" />
            </div>
          </div>
          <div v-else-if="Object.keys(formattedOptimizedPrompt).length > 0" class="space-y-6">
            <template v-if="formattedOptimizedPrompt.prompt_mejorado || formattedOptimizedPrompt.explicación_de_los_cambios">
              <div v-if="formattedOptimizedPrompt.prompt_mejorado" class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Sparkles class="h-4 w-4 text-amber-500" />
                  <span>VERSIÓN MEJORADA</span>
                </div>
                <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <p class="whitespace-pre-wrap text-foreground/90 font-sans">
                    {{ formattedOptimizedPrompt.prompt_mejorado.trim() }}
                  </p>
                </div>
              </div>

              <div v-if="formattedOptimizedPrompt.explicación_de_los_cambios" class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Info class="h-4 w-4 text-blue-500" />
                  <span>MEJORAS APLICADAS</span>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
                  <p class="whitespace-pre-wrap text-foreground/90 font-sans">
                    {{ formattedOptimizedPrompt.explicación_de_los_cambios.trim() }}
                  </p>
                </div>
              </div>

              <div v-if="formattedOptimizedPrompt.prompt && formattedOptimizedPrompt.prompt.trim()"
                   class="bg-muted/10 p-4 rounded-lg border border-border/30">
                <p class="whitespace-pre-wrap text-foreground/90 font-sans text-sm">
                  {{ formattedOptimizedPrompt.prompt.trim() }}
                </p>
              </div>
            </template>
            <template v-else>
              <div v-if="formattedOptimizedPrompt.entrada_inicial" class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <MessageSquare class="h-4 w-4 text-blue-500" />
                  <span>ENTRADA INICIAL</span>
                </div>
                <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <p class="whitespace-pre-wrap text-foreground/90 font-sans">
                    {{ formattedOptimizedPrompt.entrada_inicial.trim() }}
                  </p>
                </div>
              </div>

              <div v-if="formattedOptimizedPrompt.entrada_mejorada" class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Sparkles class="h-4 w-4 text-amber-500" />
                  <span>ENTRADA MEJORADA</span>
                </div>
                <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <p class="whitespace-pre-wrap text-foreground/90 font-sans">
                    {{ formattedOptimizedPrompt.entrada_mejorada.trim() }}
                  </p>
                </div>
              </div>

              <div v-if="formattedOptimizedPrompt.salida_deseada" class="space-y-3">
                <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Info class="h-4 w-4 text-green-500" />
                  <span>SALIDA DESEADA</span>
                </div>
                <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <p class="whitespace-pre-wrap text-foreground/90 font-sans">
                    {{ formattedOptimizedPrompt.salida_deseada.trim() }}
                  </p>
                </div>
              </div>
            </template>
          </div>
          <p v-else-if="prompt" class="whitespace-pre-wrap text-foreground/90 font-sans">
            {{ prompt.optimized_prompt }}
          </p>
        </CardContent>
      </Card>
    </template>
    <template v-else>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mb-4">
          <Sparkles class="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-medium text-foreground mb-2">Ningún prompt seleccionado</h3>
        <p class="text-muted-foreground max-w-md">
          Selecciona un prompt de la lista para ver su contenido y la versión optimizada.
        </p>
      </div>
    </template>
  </div>
  <DeletePromptModal
    :is-open="isDeleteModalOpen"
    :is-deleting="isDeleting"
    @close="closeDeleteModal"
    @confirm="handleDelete"
  />
</template>
