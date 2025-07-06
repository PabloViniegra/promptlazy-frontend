import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const action = ref<'new' | 'view'>('new')
  const selectedPromptId = ref<string | null>(null)

  // Actions
  function setSelectedPrompt(promptId: string | null) {
    selectedPromptId.value = promptId
    action.value = 'view'
  }

  function resetAction() {
    selectedPromptId.value = null
    action.value = 'new'
  }

  return {
    action,
    selectedPromptId,
    resetAction,
    setSelectedPrompt
  }

})
