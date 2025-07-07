import { getPrompt } from '@/services/prompt'
import { usePromptStore } from '@/stores/promptStore'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, type Ref } from 'vue'

export function usePrompt(idRef: Ref<string | null>) {
  const promptStore = usePromptStore()
  const { currentPrompt } = storeToRefs(promptStore)
  const queryKey = computed(() => ['prompt', idRef.value])

  const prompByIdQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => getPrompt(idRef.value!),
    enabled: computed(() => Boolean(idRef.value)),
    staleTime: 0,
  })

  watch(
    idRef,
    (newId) => {
      promptStore.setCurrentPrompt(null)
      if (newId) prompByIdQuery.refetch()
    },
    { immediate: true }
  )
  watch(
    () => prompByIdQuery.data.value,
    (newPrompt) => {
      if (newPrompt) {
        promptStore.setCurrentPrompt(newPrompt ?? null)
      }
    },
    { immediate: true }
  )

  watch(
    () => prompByIdQuery.isError.value,
    (err) => {
      if (err) console.error('Error al obtener el prompt:', err)
    }
  )

  return {
    prompt: computed(() => currentPrompt.value),
    isLoading: prompByIdQuery.isLoading || prompByIdQuery.isFetching
  }
}
