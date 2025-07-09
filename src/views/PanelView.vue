<script setup lang="ts">
import PanelChat from '@/components/prompts/PanelChat.vue'
import PromptViewer from '@/components/prompts/PromptViewer.vue'

const props = defineProps<{
  action: 'new' | 'view'
  selectedId: string | null
}>()
</script>
<template>
  <div v-if="props.action === 'new'" class="flex flex-col h-full bg-background text-foreground">
    <PanelChat />
  </div>
  <div v-else class="flex flex-col h-full bg-background text-foreground">
    <PromptViewer :prompt-id="props.selectedId"/>
  </div>
</template>
