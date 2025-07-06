<script setup lang="ts">
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Prompt } from '@/types/prompt'
import { useAppStore } from '@/stores/appStore'
import { usePrompt } from '@/composables/usePrompt'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, Sparkles, Pencil, Trash2, MessageSquare } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const appStore = useAppStore()
const { selectedPromptId } = storeToRefs(appStore)

watch(selectedPromptId, (newId: string | null) => {
  console.log('selectedPromptId cambió:', newId)
})

const { prompt: promptRef, isLoading } = usePrompt(selectedPromptId)

const currentPrompt = computed<Prompt | null>(() => {
  if (!promptRef) return null
  return { ...promptRef }
})

watch(currentPrompt, (newPrompt) => {
  console.log('currentPrompt actualizado:', newPrompt?.id)
}, { immediate: true })

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  }
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <div v-if="!isLoading && currentPrompt" class="flex justify-between items-center mb-6 px-2">
      <h2 class="text-2xl font-bold text-foreground">
        Vista de chat
      </h2>
      <div class="flex items-center space-x-2">
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
      <div class="space-y-4">
        <Skeleton class="h-10 w-64 rounded-lg bg-muted/40" />
        <Skeleton class="h-24 w-full rounded-lg bg-muted/40" />
      </div>
      <div class="space-y-4 mt-8">
        <Skeleton class="h-10 w-64 rounded-lg bg-muted/40" />
        <Skeleton class="h-32 w-full rounded-lg bg-muted/40" />
      </div>
    </template>
    <template v-else-if="currentPrompt">
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="flex items-center gap-2 text-lg">
              <MessageSquare class="h-5 w-5 text-muted-foreground" />
              <span>Prompt Original</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-muted-foreground hover:text-foreground"
              @click="copyToClipboard(currentPrompt.original_prompt)"
            >
              <Copy class="h-4 w-4" />
              <span class="sr-only">Copiar al portapapeles</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p class="whitespace-pre-wrap text-foreground/90">{{ currentPrompt.original_prompt }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="flex items-center gap-2 text-lg">
              <Sparkles class="h-5 w-5 text-amber-500" />
              <span>Prompt Optimizado</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-muted-foreground hover:text-foreground"
              @click="copyToClipboard(currentPrompt.optimized_prompt)"
            >
              <Copy class="h-4 w-4" />
              <span class="sr-only">Copiar al portapapeles</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p class="whitespace-pre-wrap text-foreground/90">{{ currentPrompt.optimized_prompt }}</p>
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
