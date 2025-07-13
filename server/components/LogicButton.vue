<script setup lang="ts">
const props = defineProps<{
  action: () => void
}>()

const { action } = props
</script>

<template>
  <button @click="action" class="text-sm font-medium transition-colors rounded-lg py-2 px-5">
    <slot />
  </button>
</template>

<style scoped>

</style>