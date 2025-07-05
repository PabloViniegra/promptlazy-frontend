<script setup lang="ts">
import PanelChat from '@/components/prompts/PanelChat.vue'
const { action } = defineProps<{
  action: string
}>()
</script>
<template>
  <div v-if="action === 'new'" class="flex flex-col h-full bg-background text-foreground">
    <PanelChat />
  </div>
</template>
