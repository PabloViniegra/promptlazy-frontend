import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const action = ref<'new' | 'view'>('new')
  const selectedPromptId = ref<string | null>(null)

  // Actions
  function setSelectedPrompt(promptId: string) {
    action.value = 'view'
    selectedPromptId.value = promptId
    console.log(`En el store el selectedPromptId es: ${selectedPromptId.value}`)
  }

  function resetAction() {
    selectedPromptId.value = null
    action.value = 'new'
  }

  return {
    action: computed(() => action.value),
    selectedPromptId: computed(() => selectedPromptId.value),
    resetAction,
    setSelectedPrompt
  }

})
