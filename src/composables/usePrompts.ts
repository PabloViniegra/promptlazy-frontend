import { usePromptStore } from '@/stores/promptStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getPrompts, createPrompt, updatePrompt } from '@/services/prompt'
import type { NewPrompt, Prompt } from '@/types/prompt'
import { watch } from 'vue'

export function usePrompts() {
  const queryClient = useQueryClient()
  const promptStore = usePromptStore()

  const promptsQuery = useQuery({
    queryKey: ['prompts'],
    queryFn: getPrompts,
  })

  watch(
    () => promptsQuery.data.value?.prompts,
    (prompts) => {
      if (prompts) {
        promptStore.setPrompts(prompts)
      }
    },
    { immediate: true }
  )

  watch(
    () => promptsQuery.isError,
    (isError) => {
      if (isError) console.error('Error cargando prompts')
    }
  )

  const createPromptMutation = useMutation<Prompt, Error, NewPrompt>({
    mutationFn: (newPrompt: NewPrompt) => createPrompt(newPrompt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] })
      promptStore.setCurrentPrompt(data)
    },
    onError: (error) => {
      console.error('Failed to create prompt:', error)
    },
  })

  const updatePromptMutation = useMutation({
    mutationFn: ({ id, updatedPrompt }: { id: string; updatedPrompt: NewPrompt }) =>
      updatePrompt(id, updatedPrompt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] })
      promptStore.setCurrentPrompt(data)
    },
    onError: (error) => {
      console.error('Failed to update prompt:', error)
    },
  })

  return {
    prompts: promptStore.prompts,
    isLoading: promptsQuery.isLoading || promptsQuery.isPending || promptsQuery.isFetching,
    createPrompt: (newPrompt: NewPrompt) => createPromptMutation.mutateAsync(newPrompt),
    isCreating: createPromptMutation.isPending,
    updatePrompt: (id: string, updatedPrompt: NewPrompt) =>
      updatePromptMutation.mutate({ id, updatedPrompt }),
    isUpdating: updatePromptMutation.isPending,
  }
}
