import { getPrompt } from '@/services/prompt'
import { usePromptStore } from '@/stores/promptStore'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch, type Ref } from 'vue'

export function usePrompt(idRef: Ref<string | null>) {
  const promptStore = usePromptStore()

  const prompByIdQuery = useQuery({
    queryKey: ['prompt', idRef.value],
    queryFn: () => getPrompt(idRef.value!),
    enabled: computed(() => Boolean(idRef.value)),
    staleTime: 0,
  })

  watch(
    idRef,
    (newId) => {
      promptStore.setCurrentPrompt(null)
      if (newId) {
        prompByIdQuery.refetch()
      }
    },
    { immediate: true }
  )
  watch(
    prompByIdQuery.data,
    (newPrompt) => {
      if (newPrompt) {
        promptStore.setCurrentPrompt(newPrompt)
      }
    },
    { immediate: true }
  )

  watch(prompByIdQuery.isError, (isError) => {
    if (isError) {
      console.error('Failed to fetch prompt')
    }
  })

  return {
    prompt: promptStore.currentPrompt,
    isLoading: prompByIdQuery.isLoading || prompByIdQuery.isPending || prompByIdQuery.isFetching,
  }
}
