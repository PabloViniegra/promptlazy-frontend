import { getPrompt } from '@/services/prompt'
import { usePromptStore } from '@/stores/promptStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, type Ref } from 'vue'
import { deletePrompt, updatePrompt } from '@/services/prompt'
import type { NewPrompt } from '@/types/prompt'

export function usePrompt(idRef: Ref<string | null>) {
  const promptStore = usePromptStore()
  const { currentPrompt } = storeToRefs(promptStore)
  const queryKey = computed(() => ['prompt', idRef.value])
  const qc = useQueryClient()

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

  const deletePromptMutation = useMutation({
    mutationFn: async (promptId: string) => {
      await deletePrompt(promptId)
      return promptId
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['prompt', idRef.value] })
      qc.invalidateQueries({ queryKey: ['prompts'] })
    },
    onError: (error) => {
      console.error('Error deleting prompt:', error)
    }
  })

  const updatePromptMutation = useMutation({
    mutationFn: async ({ promptId, prompt }: { promptId: string, prompt: NewPrompt }) => {
      await updatePrompt(promptId, prompt)
      return promptId
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['prompt', idRef.value] })
      qc.invalidateQueries({ queryKey: ['prompts'] })
    },
    onError: (error) => {
      console.error('Error updating prompt:', error)
    }
  })

  return {
    prompt: computed(() => currentPrompt.value),
    isLoading: prompByIdQuery.isLoading || prompByIdQuery.isFetching,
    refetch: prompByIdQuery.refetch,
    deletePrompt: deletePromptMutation.mutate,
    isDeleting: deletePromptMutation.isPending,
    updatePrompt: updatePromptMutation.mutate,
    isUpdating: updatePromptMutation.isPending
  }
}
