<script setup lang="ts">
import SharedNavbar from '@/components/shared/SharedNavbar.vue'
import SidebarChat from '@/components/prompts/SidebarChat.vue'
import PanelView from '@/views/PanelView.vue'
import { ref } from 'vue'

const action = ref<string>('new')
</script>
<template>
  <div class="flex h-screen bg-background text-foreground">
    <SidebarChat />
    <div class="flex-1 flex flex-col">
      <SharedNavbar />
      <main class="flex-1 overflow-auto p-6">
        <PanelView :action="action" />
      </main>
    </div>
  </div>
</template>
