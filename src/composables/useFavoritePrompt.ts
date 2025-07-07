import { useMutation } from '@tanstack/vue-query'
import { toggleFavouritePrompt } from '@/services/prompt'
import { usePrompts } from './usePrompts'

export function useFavoritePrompt() {
  const { isLoading, refetch } = usePrompts()

  const { mutate: toggleFavourite, isPending: isToggling } = useMutation({
    mutationFn: async ({ promptId, isFavorite }: { promptId: string; isFavorite: boolean }) => {
      await toggleFavouritePrompt(promptId, isFavorite)
      return { promptId, isFavorite }
    },
    onSuccess: () => {
      refetch()
    },
  })

  return {
    isLoading,
    toggleFavourite: (promptId: string, isFavorite: boolean) => {
      toggleFavourite({ promptId, isFavorite })
      return isFavorite
    },
    isToggling,
  }
}
