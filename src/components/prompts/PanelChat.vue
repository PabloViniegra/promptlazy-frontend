<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatOptimizedPrompt } from '@/utils/utils'
import {
  Send as SendIcon,
  User as UserIcon,
  Bot as BotIcon,
  Copy as CopyIcon,
  Check as CheckIcon,
} from 'lucide-vue-next'
import { useMessages } from '@/composables/useMessages'

const { messages, isCreating, sendMessage } = useMessages([
  {
    id: '1',
    content:
      '¡Hola! Sé que eres un poco vago. Envíame cualquier prompt y te ayudaré a mejorarlo para obtener mejores resultados. ¿Qué prompt te gustaría optimizar hoy?',
    role: 'assistant',
    timestamp: new Date(),
  },
])

const input = ref<string>('')
const copiedMessageId = ref<string | null>(null)

async function copyToClipboard(fullText: string, messageId: string) {
  try {
    const formattedPrompt = formatOptimizedPrompt(fullText)
    const promptToCopy = formattedPrompt.prompt_mejorado || fullText
    await navigator.clipboard.writeText(promptToCopy)
    copiedMessageId.value = messageId
    setTimeout(() => {
      if (copiedMessageId.value === messageId) {
        copiedMessageId.value = null
      }
    }, 2000)
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  }
}

const getFormattedMessage = (content: string) => {
  return formatOptimizedPrompt(content)
}

function handleSubmit(e: Event) {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return

  input.value = ''

  sendMessage({
    content: text,
    onError: (error) => {
      console.error('Error al enviar el mensaje:', error)
    }
  })
}
</script>
<template>
  <div class="flex flex-col h-full bg-background text-foreground font-sans">
    <header class="border-b border-border bg-card shadow-sm rounded-t-lg">
      <div class="container mx-auto px-6 py-4 max-w-4xl">
        <div class="flex items-center">
          <div class="flex items-center bg-primary/5 rounded-full px-4 py-2.5 border border-primary/10">
            <BotIcon class="size-5 text-primary mr-3 flex-shrink-0" />
            <h1 class="text-base font-semibold text-foreground/90 tracking-tight">
              Asistente de PromptLazy
            </h1>
          </div>
        </div>
      </div>
    </header>
    <div class="flex-1 overflow-y-auto rounded-md">
      <div class="container mx-auto px-4 py-6 max-w-4xl">
        <div class="space-y-6">
            <template v-for="msg in messages" :key="msg.id">
              <div
                :class="[
                  'flex gap-4 group',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                ]"
              >
                <Avatar
                  v-if="msg.role === 'assistant'"
                  class="size-10 border-2 border-primary/20 bg-card flex-shrink-0 transition-all duration-200 group-hover:border-primary/40"
                >
                  <AvatarFallback class="bg-gradient-to-br from-primary to-accent text-white">
                    <BotIcon class="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <Avatar
                  v-else
                  class="size-10 border-2 border-muted-foreground/20 flex-shrink-0 transition-all duration-200 group-hover:border-muted-foreground/40"
                >
                  <AvatarFallback class="bg-muted text-muted-foreground">
                    <UserIcon class="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <Card
                  :class="[
                    'max-w-[calc(100%-4rem)] p-4 transition-all duration-200',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-primary/20'
                      : 'bg-card border border-border shadow-sm',
                    'group-hover:shadow-md transition-shadow duration-200',
                    msg.role === 'assistant' && 'group-hover:shadow-muted-foreground/5'
                  ]"
                >
                  <div class="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-1 font-sans">
                    <template v-if="msg.role === 'assistant' && msg.id !== '1'">
                      <!-- Show formatted sections for optimized prompt -->
                      <template v-if="getFormattedMessage(msg.content).prompt_mejorado">
                        <!-- Improved Version Section -->
                        <div v-if="getFormattedMessage(msg.content).prompt_mejorado" class="space-y-3">
                          <h3 class="font-bold text-base mb-2 text-foreground">
                            VERSIÓN MEJORADA
                          </h3>
                          <div class="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <p class="whitespace-pre-wrap text-foreground/90">
                              {{ getFormattedMessage(msg.content).prompt_mejorado }}
                            </p>
                          </div>
                        </div>

                        <!-- Explanation Section -->
                        <div v-if="getFormattedMessage(msg.content).explicación_de_los_cambios" class="space-y-3 mt-6">
                          <h3 class="font-bold text-base mb-2 text-foreground">
                            MEJORAS APLICADAS
                          </h3>
                          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
                            <p class="whitespace-pre-wrap text-foreground/90">
                              {{ getFormattedMessage(msg.content).explicación_de_los_cambios }}
                            </p>
                          </div>
                        </div>
                      </template>

                      <!-- Fallback to original content if not in the expected format -->
                      <template v-else>
                        <template v-for="(line, idx) in msg.content.split('\n')" :key="idx">
                          <h3
                            v-if="line.startsWith('**') && line.endsWith('**')"
                            class="font-bold text-base mb-2 mt-4 first:mt-0 text-foreground"
                          >
                            {{ line.replace(/\*\*/g, '') }}
                          </h3>
                          <ul v-else-if="line.startsWith('•')" class="list-disc pl-5 space-y-1">
                            <li>{{ line.slice(2) }}</li>
                          </ul>
                          <ol v-else-if="/^\d+\./.test(line)" class="list-decimal pl-5 space-y-1">
                            <li>{{ line.replace(/^\d+\.\s*/, '') }}</li>
                          </ol>
                          <p v-else-if="line" class="mb-2 last:mb-0">{{ line }}</p>
                          <br v-else-if="line === ''" />
                        </template>
                      </template>
                    </template>

                    <!-- Regular message formatting for non-optimized content -->
                    <template v-else>
                      <template v-for="(line, idx) in msg.content.split('\n')" :key="idx">
                        <h3
                          v-if="line.startsWith('**') && line.endsWith('**')"
                          :class="[
                            'font-bold text-base mb-2 mt-4 first:mt-0',
                            msg.role === 'user' ? 'text-white' : 'text-foreground'
                          ]"
                        >
                          {{ line.replace(/\*\*/g, '') }}
                        </h3>
                        <ul v-else-if="line.startsWith('•')" class="list-disc pl-5 space-y-1">
                          <li :class="{ 'text-white': msg.role === 'user' }">
                            {{ line.slice(2) }}
                          </li>
                        </ul>
                        <ol v-else-if="/^\d+\./.test(line)" class="list-decimal pl-5 space-y-1">
                          <li :class="{ 'text-white': msg.role === 'user' }">
                            {{ line.replace(/^\d+\.\s*/, '') }}
                          </li>
                        </ol>
                        <p v-else-if="line" class="mb-2 last:mb-0">{{ line }}</p>
                        <br v-else-if="line === ''" />
                      </template>
                    </template>
                    <div class="flex justify-between items-center mt-2">
                      <div v-if="msg.role === 'assistant' && msg.id !== '1'" class="flex-1">
                        <Button
                          v-if="msg.content"
                          type="button"
                          variant="ghost"
                          size="sm"
                          class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          @click="copyToClipboard(msg.content, msg.id)"
                        >
                          <CheckIcon v-if="copiedMessageId === msg.id" class="h-3.5 w-3.5 mr-1 text-green-500" />
                          <CopyIcon v-else class="h-3.5 w-3.5 mr-1" />
                          {{ copiedMessageId === msg.id ? '¡Copiado!' : 'Copiar prompt' }}
                        </Button>
                      </div>
                      <div
                        :class="[
                          'text-xs font-mono',
                          msg.role === 'user' ? 'text-blue-100' : 'text-muted-foreground',
                          msg.role === 'assistant' ? 'ml-auto' : ''
                        ]"
                      >
                        {{ new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </template>
            <div v-if="isCreating" class="flex justify-start gap-4">
              <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <div class="w-8 h-8 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <BotIcon class="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
              <Card class="px-4 py-3 bg-muted/50 border-border">
                <div class="flex space-x-2">
                  <div class="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style="animation-delay: 0s"></div>
                  <div class="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
              </Card>
            </div>
        </div>
      </div>
    </div>
    <div class="border-t border-border bg-background/80 backdrop-blur-sm">
      <div class="container mx-auto max-w-4xl p-4">
        <form @submit.prevent="handleSubmit" class="flex gap-3">
          <Input
            v-model="input"
            type="text"
            placeholder="Escribe tu mensaje..."
            class="flex-1 rounded-full px-5 py-6 text-base border-border/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200 font-sans"
            :disabled="isCreating"
          />
          <Button
            type="submit"
            :disabled="!input.trim() || isCreating"
            class="rounded-full w-12 h-12 p-0 flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-200"
            :class="{
              'bg-primary/90 hover:bg-primary': input.trim(),
              'bg-muted-foreground/10': !input.trim()
            }"
          >
            <SendIcon class="w-5 h-5" />
            <span class="sr-only">Enviar mensaje</span>
          </Button>
        </form>
        <p class="text-xs text-muted-foreground mt-2 text-center">
          PromptLazy puede cometer errores. Considera verificar información importante.
        </p>
      </div>
    </div>
  </div>
</template>
