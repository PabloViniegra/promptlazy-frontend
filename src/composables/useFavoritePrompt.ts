import { getFavouritesPrompts, toggleFavouritePrompt } from '@/services/prompt'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { usePromptStore } from '@/stores/promptStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

export function useFavoritePrompt() {
  const queryClient = useQueryClient()
  const promptStore = usePromptStore()

  const { favourites } = storeToRefs(promptStore)

  const favouritesQuery = useQuery({
    queryKey: ['favourites'],
    queryFn: getFavouritesPrompts,
  })

  watch(
    () => favouritesQuery.data,
    (newFavourites) => {
      if (newFavourites.value) {
        promptStore.setFavourites(newFavourites.value.prompts)
      }
    },
    { immediate: true }
  )

  watch(
    () => favouritesQuery.isError,
    (isError) => {
      if (isError) console.error('Error cargando favoritos')
    }
  )


  const toggleFavouriteMutation = useMutation({
    mutationFn: (promptId: string) => toggleFavouritePrompt(promptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
    },
    onError: (error) => {
      console.error('Failed to toggle favourite:', error)
    }
  })

  return {
    favourites,
    isLoading: favouritesQuery.isLoading || toggleFavouriteMutation.isPending || favouritesQuery.isPending || favouritesQuery.isFetching,
    toggleFavourite: (promptId: string) => toggleFavouriteMutation.mutate(promptId),
    isToggling: toggleFavouriteMutation.isPending,
  }
}
