<script setup lang="ts">
const props = defineProps<{
  className: string
}>()
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="128"
    height="128"
    viewBox="0 0 24 24"
    :class="props.className"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        dur="560ms"
        from="0,12,12"
        repeatCount="indefinite"
        to="360,12,12"
        type="rotate"
      />
    </path>
  </svg>
</template>
