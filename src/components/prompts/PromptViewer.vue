<script setup lang="ts">
import { usePrompt } from '@/composables/usePrompt'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, Sparkles, Pencil, Trash2, MessageSquare, Star, Info } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { computed, toRef } from 'vue'
import type { OptimizedPromptSections } from '@/types/prompt'

const props = defineProps<{
  promptId: string | null
}>()
const idRef = toRef(props, 'promptId')
console.log(idRef.value)
const { prompt, isLoading } = usePrompt(idRef)


const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  }
}


const formattedOptimizedPrompt = computed<OptimizedPromptSections>(() => {
  if (!prompt.value?.optimized_prompt) return {}

  const sections: OptimizedPromptSections = {}
  const lines = prompt.value.optimized_prompt.split('\n')

  let currentSection = 'prompt'
  sections[currentSection] = ''

  for (const line of lines) {
    if (line.startsWith('---')) continue
    const sectionMatch = line.match(/^(?:\*\*)?\s*(Prompt mejorado|Explicación de los cambios)\s*(?:\*\*)?:?/i)
    if (sectionMatch) {
      currentSection = sectionMatch[1].toLowerCase().replace(/\s+/g, '_')
      sections[currentSection] = ''
    } else {
      if (sections[currentSection]) {
        sections[currentSection] = (sections[currentSection] as string) + '\n' + line
      } else {
        sections[currentSection] = line
      }
    }
  }

  return sections
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6 font-sans">
    <div v-if="!isLoading && prompt" class="flex justify-between items-center mb-6 px-2">
      <h2 class="text-2xl font-bold text-foreground font-heading">
        Vista de chat
      </h2>
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          :class="[
            'h-8 px-3 transition-all duration-200 border',
            prompt?.is_favorite
              ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:text-amber-700'
              : 'border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-muted-foreground/30'
          ]"
          @click="$emit('toggle-favorite')"
        >
          <template v-if="prompt?.is_favorite">
            <Star class="h-4 w-4 mr-1.5 fill-amber-500 text-amber-500" />
            <span class="font-medium">Favorito</span>
          </template>
          <template v-else>
            <Star class="h-4 w-4 mr-1.5" />
            <span>Añadir a favoritos</span>
          </template>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-8 px-3 transition-colors"
          @click="$emit('edit')"
        >
          <Pencil class="h-4 w-4 mr-1.5" />
          <span>Editar</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="sm"
              class="text-destructive/80 hover:text-destructive hover:bg-destructive/5 h-8 px-3 transition-colors"
            >
              <Trash2 class="h-4 w-4 mr-1.5" />
              <span>Eliminar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuItem
              class="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer"
              @click="$emit('delete')"
            >
              <Trash2 class="h-4 w-4 mr-2" />
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
          <p class="whitespace-pre-wrap text-foreground/90 font-sans">{{ prompt.original_prompt }}</p>
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
          <div v-if="formattedOptimizedPrompt.prompt_mejorado || formattedOptimizedPrompt.explicación_de_los_cambios" class="space-y-6">
            <div v-if="formattedOptimizedPrompt.prompt_mejorado" class="space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Sparkles class="h-4 w-4 text-amber-500" />
                <span>VERSIÓN MEJORADA</span>
              </div>
              <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                <p class="whitespace-pre-wrap text-foreground/90 font-sans">{{ formattedOptimizedPrompt.prompt_mejorado.trim() }}</p>
              </div>
            </div>
            <div v-if="formattedOptimizedPrompt.explicación_de_los_cambios" class="space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Info class="h-4 w-4 text-blue-500" />
                <span>MEJORAS APLICADAS</span>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
                <p class="whitespace-pre-wrap text-foreground/90 font-sans">{{ formattedOptimizedPrompt.explicación_de_los_cambios.trim() }}</p>
              </div>
            </div>
            <div v-if="formattedOptimizedPrompt.prompt && formattedOptimizedPrompt.prompt.trim()" class="bg-muted/10 p-4 rounded-lg border border-border/30">
              <p class="whitespace-pre-wrap text-foreground/90 font-sans text-sm">{{ formattedOptimizedPrompt.prompt.trim() }}</p>
            </div>
          </div>
          <p v-else class="whitespace-pre-wrap text-foreground/90 font-sans">{{ prompt.optimized_prompt }}</p>
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
