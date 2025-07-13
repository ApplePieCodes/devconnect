<script setup lang="ts">
import { defineProps } from 'vue'
import { Plus } from 'lucide-vue-next' // install with `npm i lucide-vue-next`

const props = defineProps<{
  openPostModal: () => void
}>()

const { openPostModal } = props
</script>

<template>
  <div class="fixed bottom-0 right-0">
    <button
        class="rounded-full bg-gray-800 transition-colors hover:bg-gray-700 px-5 py-5 mb-3 mr-3"
        @click="openPostModal"
    >
      <Plus color="white" />
    </button>
  </div>
</template>

<style scoped>

</style>