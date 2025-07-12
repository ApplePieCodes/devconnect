<template>
  <a :href="link">
    <button
        class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative"
        :class="[foreground, foregroundHover, background, backgroundHover]"
    >
      {{ text }}
    </button>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string
  text: string
  foreground: string
  foregroundHover: string
  background: string
  backgroundHover: string
}>()

const { link, text, foreground, foregroundHover, background, backgroundHover } = props
</script>
