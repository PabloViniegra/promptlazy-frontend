import { useMutation, useQuery } from '@tanstack/vue-query'
import { toggleFavouritePrompt } from '@/services/prompt'
import { getFavouritesPrompts } from '@/services/prompt'
import { useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { usePromptStore } from '@/stores/promptStore'

export function useFavoritePrompt() {
  const qc = useQueryClient()
  const promptStore = usePromptStore()

  const getFavouritesQuery = useQuery({
    queryKey: ['favourites'],
    queryFn: getFavouritesPrompts,
  })

  watch(
    () => getFavouritesQuery.data.value,
    (favourites) => {
      if (favourites) {
        promptStore.setFavorites(favourites.prompts)
      }
    },
    { immediate: true }
  )

  watch(
    () => getFavouritesQuery.isError,
    (isError) => {
      if (isError) console.error('Error cargando favoritos')
    }
  )

  const { mutateAsync: toggleFavourite, isPending: isToggling } = useMutation({
    mutationFn: async ({ promptId, isFavorite }: { promptId: string; isFavorite: boolean }) => {
      const result = await toggleFavouritePrompt(promptId, isFavorite)
      return { promptId, isFavorite, result }
    },
    onMutate: async ({ promptId, isFavorite }) => {
      const previousFavorites = promptStore.favorites
      if (isFavorite) {
        const promptToAdd = promptStore.prompts.find(p => p.id === promptId)
        if (promptToAdd) {
          promptStore.setFavorites([...promptStore.favorites, promptToAdd])
        }
      } else {
        promptStore.setFavorites(promptStore.favorites.filter(p => p.id !== promptId))
      }

      return { previousFavorites }
    },
    onError: (err, variables, context) => {
      if (context?.previousFavorites) {
        promptStore.setFavorites(context.previousFavorites)
      }
    },
    onSettled: () => {
      return qc.invalidateQueries({ queryKey: ['favourites'] })
    }
  })

  return {
    favourites: computed(() => promptStore.favorites),
    isLoading: getFavouritesQuery.isLoading || getFavouritesQuery.isPending || getFavouritesQuery.isFetching,
    toggleFavourite: async (promptId: string, isFavorite: boolean) => {
      try {
        await toggleFavourite({ promptId, isFavorite })
        return true
      } catch (error) {
        console.error('Error al actualizar favorito:', error)
        return false
      }
    },
    isToggling,
  }
}
