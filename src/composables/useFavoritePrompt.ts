import { useMutation } from '@tanstack/vue-query'
import { toggleFavouritePrompt } from '@/services/prompt'
import { usePrompts } from './usePrompts'

export function useFavoritePrompt() {
  const { prompts, isLoading, refetch } = usePrompts()

  const { mutate: toggleFavourite, isPending: isToggling } = useMutation({
    mutationFn: async ({ promptId, isFavorite }: { promptId: string; isFavorite: boolean }) => {
      await toggleFavouritePrompt(promptId, isFavorite)
      return { promptId, isFavorite }
    },
    onSuccess: () => {
      refetch()
    },
  })

  const isFavorited = (promptId: string) => {
    return prompts.value?.some(p => p.id === promptId && p.is_favorite) || false
  }

  return {
    isLoading,
    toggleFavourite: (promptId: string) => {
      const isFavorite = !isFavorited(promptId)
      toggleFavourite({ promptId, isFavorite })
      return isFavorite
    },
    isToggling,
    isFavorited,
  }
}
