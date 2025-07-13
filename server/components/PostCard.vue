<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserIcon from '~/server/components/UserIcon.vue'
import ButtonGroup from '~/server/components/ButtonGroup.vue'
import GroupedLogicButton from '~/server/components/GroupedLogicButton.vue'
import { getLevelColor, getLoggedInUserID, getRankText, supabase } from '~/server'

const props = defineProps<{
  id: string
  onQuote: (id: string) => void
}>()

const body = ref('')
const userId = ref<string>()
const displayName = ref('')
const username = ref('')
const level = ref(0)
const levelColor = ref('')
const postUpvoted = ref(false)

const quotePost = ref(false)
const parentPoster = ref('')
const parentContent = ref('')

onMounted(async () => {
  const { data: pData } = await supabase.from('posts').select('*').eq('id', props.id).limit(1)
  if (!pData || pData.length === 0) return

  const post = pData[0]
  body.value = post.content
  userId.value = post.poster

  const { data: uData } = await supabase.from('users').select('*').eq('id', userId.value).limit(1)
  if (!uData || uData.length === 0) return

  const user = uData[0]
  displayName.value = user.display_name
  username.value = user.username
  level.value = user.level
  levelColor.value = getLevelColor(user.level)

  const { data: upvoteData } = await supabase
      .from('upvotes')
      .select('*')
      .eq('post_id', props.id)
      .eq('user_id', await getLoggedInUserID())
      .limit(1)

  if (upvoteData?.length === 1) {
    postUpvoted.value = true
  }

  if (post.parent) {
    quotePost.value = true

    const { data: parentPostData } = await supabase.from('posts').select('*').eq('id', post.parent).limit(1)
    const { data: parentUserData } = await supabase.from('users').select('*').eq('id', parentPostData?.[0]?.poster).limit(1)

    parentPoster.value = parentUserData?.[0]?.username || ''
    parentContent.value = parentPostData?.[0]?.content || ''
  }
})

async function upvoteClicked() {
  const { data } = await supabase
      .from('upvotes')
      .select('*')
      .eq('post_id', props.id)
      .eq('user_id', await getLoggedInUserID())
      .limit(1)

  if (!data?.length) {
    await supabase.rpc('upvotepost', { post: props.id })
    postUpvoted.value = true
  } else {
    await supabase.rpc('removeupvote', { post: props.id })
    postUpvoted.value = false
  }
}

function quoteClicked() {
  props.onQuote(props.id)
}

async function reportClicked() {
  await supabase.rpc('reportpost', { post: props.id })
}
</script>

<template>
  <div class="flex items-start gap-4 mt-5 rounded-xl px-5 py-5 bg-purple-700 text-white">
    <UserIcon v-if="userId" :id="userId" />

    <div>
      <p class="text-lg font-semibold">{{ displayName }}</p>
      <p class="text-sm text-gray-300">
        @{{ username }}
        <span class="ml-1" :class="levelColor">
          • Level {{ level }} ({{ getRankText(level) }})
        </span>
      </p>

      <div v-if="quotePost" class="ml-2">
        <p class="text-sm">Responding to:</p>
        <p class="text-sm">@{{ parentPoster }}</p>
        <p class="text-sm">{{ parentContent }}</p>
      </div>

      <p class="my-2 text-base">{{ body }}</p>

      <ButtonGroup>
        <GroupedLogicButton
            :action="upvoteClicked"
            foreground="text-white"
            :background="postUpvoted ? 'bg-purple-600' : 'bg-gray-800'"
            foreground-hover="hover:text-gray-50"
            :background-hover="postUpvoted ? 'hover:bg-purple-500' : 'hover:bg-gray-700'"
        >
          Upvote
        </GroupedLogicButton>

        <GroupedLogicButton
            :action="quoteClicked"
            foreground="text-white"
            background="bg-gray-800"
            foreground-hover="hover:text-gray-50"
            background-hover="hover:bg-gray-700"
        >
          Quote
        </GroupedLogicButton>

        <GroupedLogicButton
            :action="reportClicked"
            foreground="text-white"
            background="bg-gray-800"
            foreground-hover="hover:text-gray-50"
            background-hover="hover:bg-gray-700"
        >
          Report
        </GroupedLogicButton>
      </ButtonGroup>
    </div>
  </div>
</template>

<style scoped>

</style>