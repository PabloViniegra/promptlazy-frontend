<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
</script>
<template>
  <main class="dark:bg-secondary-foreground min-h-screen">
    <RouterView />
  </main>
  <VueQueryDevtools />
</template>
