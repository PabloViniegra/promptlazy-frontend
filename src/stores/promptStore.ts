import { defineStore } from 'pinia'
import type { Prompt } from '@/types/prompt'
import { ref } from 'vue'

export const usePromptStore = defineStore('prompts', () => {
  // State
  const prompts = ref<Prompt[]>([])
  const favourites = ref<Prompt[]>([])
  const currentPrompt = ref<Prompt | null>(null)
  // Actions
  function setPrompts(newPrompts: Prompt[]) {
    console.log('Setting prompts:', newPrompts)
    prompts.value = newPrompts
    console.log('Prompts set:', prompts.value)
  }
  function setFavourites(newFavourites: Prompt[]) {
    favourites.value = newFavourites
  }
  function setCurrentPrompt(prompt: Prompt | null) {
    currentPrompt.value = prompt
  }

  return {
    prompts,
    favourites,
    currentPrompt,
    setPrompts,
    setFavourites,
    setCurrentPrompt
  }
})
