import { getPrompt } from '@/services/prompt'
import { usePromptStore } from '@/stores/promptStore'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'


export function usePrompt(id: string) {
  const promptStore = usePromptStore()

  const prompByIdQuery = useQuery({
    queryKey: ['prompt', id],
    queryFn: () => getPrompt(id),
    enabled: !!id
  })

  watch(prompByIdQuery.data, (newPrompt) => {
    if (newPrompt) {
      promptStore.setCurrentPrompt(newPrompt)
    }
  }, { immediate: true })

  watch(prompByIdQuery.isError, (isError) => {
    if (isError) {
      console.error('Failed to fetch prompt')
    }
  })

  return {
    prompt: promptStore.currentPrompt,
    isLoading: prompByIdQuery.isLoading,
  }
}
