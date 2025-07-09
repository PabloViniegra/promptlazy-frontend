<script setup lang="ts">
import SharedNavbar from '@/components/shared/SharedNavbar.vue'
import SidebarChat from '@/components/prompts/SidebarChat.vue'
import PanelView from '@/views/PanelView.vue'
import { useAppStore } from '@/stores/appStore'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()
const selectedId = ref<string | null>(null)
const action = computed(() => appStore.action)

const checkUrlForPromptId = () => {
  const promptId = Array.isArray(route.query.promptId)
    ? route.query.promptId[0]
    : route.query.promptId

  if (promptId) {
    selectedId.value = promptId
    appStore.setSelectedPrompt(promptId)
  } else {
    selectedId.value = null
    appStore.resetAction()
  }
}

onMounted(checkUrlForPromptId)
watch(() => route.query, checkUrlForPromptId)

function onSelectChat(id: string) {
  selectedId.value = id
  appStore.setSelectedPrompt(id)
}

function onNewChat() {
  selectedId.value = null
  appStore.resetAction()
}
</script>
<template>
  <div class="flex h-screen bg-background text-foreground">
    <SidebarChat @select-chat="onSelectChat" @new-chat="onNewChat" />
    <div class="flex-1 flex flex-col">
      <SharedNavbar />
      <main class="flex-1 overflow-auto p-6">
        <PanelView :action="action" :selected-id="selectedId" />
      </main>
    </div>
  </div>
</template>
