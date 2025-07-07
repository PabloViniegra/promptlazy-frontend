import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    openModal,
    closeModal
  }
}
