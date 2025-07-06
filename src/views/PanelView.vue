<script setup lang="ts">
import PanelChat from '@/components/prompts/PanelChat.vue'
import PromptViewer from '@/components/prompts/PromptViewer.vue'
import { useAppStore } from '@/stores/appStore'
import { computed } from 'vue'

const appStore = useAppStore()
const action = computed(() => appStore.action)
</script>
<template>
  <div v-if="action === 'new'" class="flex flex-col h-full bg-background text-foreground">
    <PanelChat />
  </div>
  <div v-else class="flex flex-col h-full bg-background text-foreground">
    <PromptViewer />
  </div>
</template>
