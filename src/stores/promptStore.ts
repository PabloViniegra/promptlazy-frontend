import { defineStore } from 'pinia'
import type { Prompt } from '@/types/prompt'
import { ref, computed } from 'vue'

export const usePromptStore = defineStore('prompts', () => {
  // State
  const prompts = ref<Prompt[]>([])
  const currentPrompt = ref<Prompt | null>(null)
  
  // Actions
  function setPrompts(newPrompts: Prompt[]) {
    prompts.value = newPrompts
  }
  
  function setCurrentPrompt(prompt: Prompt | null) {
    currentPrompt.value = prompt
  }

  return {
    prompts: computed(() => prompts.value),
    currentPrompt: computed(() => currentPrompt.value),
    setPrompts,
    setCurrentPrompt
  }
})
