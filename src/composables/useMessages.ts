import { ref } from 'vue'
import type { Message, MessageRole, SendMessageParams } from '@/types/messages'
import { usePrompts } from './usePrompts'

export function useMessages(initialMessages: Message[] = []) {
  const messages = ref<Message[]>(initialMessages)
  const { createPrompt, isCreating } = usePrompts()

  const addMessage = (content: string, role: MessageRole) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    }
    messages.value.push(newMessage)
    return newMessage
  }

  const sendMessage = async ({
    content,
    onSuccess,
    onError,
  }: SendMessageParams) => {
    if (!content.trim() || isCreating.value) return

    addMessage(content, 'user')

    try {
      const prompt = await createPrompt({ prompt: content })
      const optimizedPrompt = prompt?.optimized_prompt || ''

      addMessage(optimizedPrompt, 'assistant')

      if (onSuccess) {
        onSuccess(optimizedPrompt)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = 'Error al generar prompt. Intenta de nuevo.'
      addMessage(errorMessage, 'assistant')

      if (onError) {
        onError(error as Error)
      }
    }
  }

  return {
    messages,
    isCreating,
    sendMessage,
    addMessage,
  }
}
