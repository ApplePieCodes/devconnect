<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '~/server'
import ButtonGroup from '~/server/components/ButtonGroup.vue'
import GroupedLogicButton from '~/server/components/GroupedLogicButton.vue'

const props = defineProps<{
  closeModal: () => void
}>()

const body = ref('')

async function submitPost() {
  await supabase.rpc('post', { content: body.value })
  // @ts-expect-error: window is available in browser
  window.location.reload()
}
</script>

<template>
  <div>
    <div
        role="button"
        tabindex="0"
        class="fixed inset-0 bg-black/70 bg-opacity-60 z-40"
    ></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Make a new Post</h2>
        <textarea
            v-model="body"
            class="w-full h-32 p-2 border rounded mb-4"
        ></textarea>
        <div class="float-right">
          <ButtonGroup>
            <GroupedLogicButton
                :action="closeModal"
                foreground="text-white"
                background="bg-gray-700"
                foreground-hover="hover:text-white"
                background-hover="hover:bg-gray-500"
            >
              Cancel
            </GroupedLogicButton>
            <GroupedLogicButton
                :action="submitPost"
                foreground="text-white"
                background="bg-purple-700"
                foreground-hover="hover:text-white"
                background-hover="hover:bg-purple-500"
            >
              Post
            </GroupedLogicButton>
          </ButtonGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>