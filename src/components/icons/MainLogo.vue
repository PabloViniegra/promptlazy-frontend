<script setup lang="ts">
const { className } = defineProps<{
  className?: string
}>()
</script>

<template>
  <svg
    :class="className"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="PromptLazy Logo"
    class="main-logo"
  >
    <rect width="240" height="240" fill="none" />

    <path
      d="M120 30 L200 180 L40 180 Z"
      fill="none"
      stroke="currentColor"
      stroke-width="14"
      stroke-linejoin="round"
      class="triangle"
    />

    <path
      d="M120 70 L132 120 L108 120 L144 200"
      fill="none"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inner-lines"
    />

    <circle
      cx="120"
      cy="120"
      r="24"
      fill="currentColor"
      class="center-dot"
    />

    <line
      x1="80"
      y1="160"
      x2="60"
      y2="200"
      stroke="currentColor"
      stroke-width="8"
      stroke-linecap="round"
      class="bottom-line"
    />
    <line
      x1="160"
      y1="160"
      x2="180"
      y2="200"
      stroke="currentColor"
      stroke-width="8"
      stroke-linecap="round"
      class="bottom-line"
    />
  </svg>
</template>

<style scoped>
.main-logo {
  display: block;
  transition: transform 0.3s ease;
}

.main-logo:hover {
  transform: scale(1.05);
}

.triangle {
  opacity: 0.9;
  transition: stroke-opacity 0.3s ease;
}

.inner-lines {
  opacity: 0.9;
  transition: stroke-opacity 0.3s ease;
}

.center-dot {
  opacity: 0.9;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bottom-line {
  opacity: 0.8;
  transition: stroke-opacity 0.3s ease;
}

.main-logo:hover .triangle,
.main-logo:hover .inner-lines,
.main-logo:hover .center-dot,
.main-logo:hover .bottom-line {
  opacity: 1;
}

.main-logo:hover .center-dot {
  transform: scale(1.1);
  transform-origin: center;
}
</style>
