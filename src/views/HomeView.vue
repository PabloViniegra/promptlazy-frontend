<script setup lang="ts">
import SharedNavbar from '@/components/shared/SharedNavbar.vue'
import SidebarChat from '@/components/prompts/SidebarChat.vue'
import PanelView from '@/views/PanelView.vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

function handleSelectChat(id: string) {
  appStore.setSelectedPrompt(id)
}
</script>
<template>
  <div class="flex h-screen bg-background text-foreground">
    <SidebarChat @select-chat="handleSelectChat" @new-chat="appStore.resetAction" />
    <div class="flex-1 flex flex-col">
      <SharedNavbar />
      <main class="flex-1 overflow-auto p-6">
        <PanelView />
      </main>
    </div>
  </div>
</template>
