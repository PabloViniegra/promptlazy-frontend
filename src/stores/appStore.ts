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
