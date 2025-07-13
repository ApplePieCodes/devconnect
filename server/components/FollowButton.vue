<script setup lang="ts">
const props = defineProps<{
  action: () => void
  foreground: string
  foregroundHover: string
  background: string
  backgroundHover: string
}>()

const { action, foreground, foregroundHover, background, backgroundHover } = props
</script>

<template>
  <button
      @click="action"
      class="rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:relative"
      :class="[foreground, foregroundHover, background, backgroundHover]"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>