<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>
<template>
  <Toaster />
  <main class="dark:bg-secondary-foreground min-h-screen">
    <RouterView />
  </main>
  <VueQueryDevtools />
</template>
