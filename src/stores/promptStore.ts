import { defineStore } from 'pinia'
import type { Prompt } from '@/types/prompt'
import { ref, computed } from 'vue'

export const usePromptStore = defineStore('prompts', () => {
  // State
  const prompts = ref<Prompt[]>([])
  const currentPrompt = ref<Prompt | null>(null)
  const favorites = ref<Prompt[]>([])

  // Actions
  function setPrompts(newPrompts: Prompt[]) {
    prompts.value = newPrompts
  }

  function setCurrentPrompt(prompt: Prompt | null) {
    currentPrompt.value = prompt
  }

  function setFavorites(newFavorites: Prompt[]) {
    favorites.value = newFavorites
  }

  return {
    prompts: computed(() => prompts.value),
    currentPrompt: computed(() => currentPrompt.value),
    setPrompts,
    setCurrentPrompt,
    favorites: computed(() => favorites.value),
    setFavorites
  }
})
