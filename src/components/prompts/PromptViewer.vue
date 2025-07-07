<script setup lang="ts">
import { computed, h, toRef } from 'vue'
import { Copy, Sparkles, Pencil, Trash2, MessageSquare, Star, Info, Check } from 'lucide-vue-next'
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
import type { OptimizedPromptSections } from '@/types/prompt'
import { useFavoritePrompt } from '@/composables/useFavoritePrompt'

interface Props {
  promptId: string | null
}

const props = defineProps<Props>()
const idRef = toRef(props, 'promptId')
const { prompt, isLoading } = usePrompt(idRef)
const { toggleFavourite } = useFavoritePrompt()

const handleToggleFavorite = (promptId: string) => {
  if (!prompt.value) return
  toggleFavourite(promptId)
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
            prompt?.is_favorite
              ? [
                  'bg-amber-50 dark:bg-amber-900/30',
                  'border-amber-200 dark:border-amber-800/70',
                  'text-amber-700 dark:text-amber-300',
                  'hover:bg-amber-100 dark:hover:bg-amber-900/50',
                  'hover:border-amber-300 dark:hover:border-amber-700',
                  'hover:text-amber-800 dark:hover:text-amber-200',
                  'focus-visible:ring-2 focus-visible:ring-amber-500',
                  'shadow-sm dark:shadow-amber-900/20',
                  'dark:shadow-sm'
                ]
              : [
                  'border-muted-foreground/20 dark:border-muted-foreground/30',
                  'text-muted-foreground dark:text-muted-foreground/90',
                  'hover:bg-muted/50 dark:hover:bg-muted/70',
                  'hover:text-foreground dark:hover:text-foreground/90',
                  'hover:border-muted-foreground/30 dark:hover:border-muted-foreground/40',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  'dark:shadow-sm'
                ]
          ]"
          @click.stop="handleToggleFavorite(prompt.id)"
        >
          <template v-if="prompt?.is_favorite">
            <Star class="size-4 mr-1.5 flex-shrink-0 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
            <span class="font-medium whitespace-nowrap">Favorito</span>
          </template>
          <template v-else>
            <Star class="size-4 mr-1.5 flex-shrink-0 text-muted-foreground/80 dark:text-muted-foreground/70" />
            <span class="whitespace-nowrap">Añadir a favoritos</span>
          </template>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-8 px-3 transition-colors"
          @click="$emit('edit')"
        >
          <Pencil class="size-4 mr-1.5" />
          <span>Editar</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="sm"
              class="text-destructive/80 hover:text-destructive hover:bg-destructive/5 h-8 px-3 transition-colors"
            >
              <Trash2 class="size-4 mr-1.5" />
              <span>Eliminar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuItem
              class="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer"
              @click="$emit('delete')"
            >
              <Trash2 class="size-4 mr-2" />
              <span>Eliminar prompt</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              <MessageSquare class="h-5 w-5 text-muted-foreground" />
              <span>Prompt Original</span>
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
          <p class="whitespace-pre-wrap text-foreground/90 font-sans">
            {{ prompt.original_prompt }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="flex items-center gap-2 text-lg font-medium">
              <Sparkles class="h-5 w-5 text-amber-500" />
              <span>Prompt Optimizado</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-muted-foreground hover:text-foreground"
              @click="copyToClipboard(prompt.optimized_prompt)"
            >
              <Copy class="h-4 w-4" />
              <span class="sr-only">Copiar al portapapeles</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="Object.keys(formattedOptimizedPrompt).length > 0" class="space-y-6">
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
</template>
