<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '~/server'
import ButtonGroup from '~/server/components/ButtonGroup.vue'
import GroupedLogicButton from '~/server/components/GroupedLogicButton.vue'

const props = defineProps<{
  id: string
  closeModal: () => void
}>()

const ogPostUsername = ref('')
const ogPostBody = ref('')
const quoteBody = ref('')

async function submitQuote() {
  await supabase.rpc('postquote', {
    quoted: props.id,
    content: quoteBody.value,
  })

  window.location.reload()
}

onMounted(async () => {
  const { data: postData } = await supabase.from('posts').select('*').eq('id', props.id).limit(1)
  if (postData && postData.length > 0) {
    const { data: userData } = await supabase.from('users').select('*').eq('id', postData[0].poster).limit(1)
    if (userData && userData.length > 0) {
      ogPostUsername.value = '@' + userData[0].username
      ogPostBody.value =
          postData[0].content.length > 100
              ? postData[0].content.slice(0, 100) + '...'
              : postData[0].content
    }
  }
})
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
        <h2 class="text-xl font-bold mb-4">Quote this Post</h2>
        <div>
          <h2 class="text-md font-bold">{{ ogPostUsername }}</h2>
          <p>{{ ogPostBody }}</p>
        </div>

        <textarea
            v-model="quoteBody"
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
                :action="submitQuote"
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