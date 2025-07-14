<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserIcon from '~/server/components/UserIcon.vue'
import ButtonGroup from '~/server/components/ButtonGroup.vue'
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
const postIsViewers = ref(false)
const verified = ref(false);
const parentId = ref('');

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
  verified.value = user.verified

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

    parentId.value = post.parent;

    const { data: parentPostData } = await supabase.from('posts').select('*').eq('id', post.parent).limit(1)
    const { data: parentUserData } = await supabase.from('users').select('*').eq('id', parentPostData?.[0]?.poster).limit(1)

    parentPoster.value = parentUserData?.[0]?.username || ''
    parentContent.value = parentPostData?.[0]?.content || ''
  }
  if (post.poster === await getLoggedInUserID()) {
    postIsViewers.value = true
  }
})

async function upvoteClicked(event: Event) {
  event.preventDefault() // Prevent navigation
  event.stopPropagation() // Stop event bubbling

  console.log('Upvoting post ID:', props.id)
  console.log('User ID:', await getLoggedInUserID())

  const { data } = await supabase
      .from('upvotes')
      .select('*')
      .eq('post_id', props.id)
      .eq('user_id', await getLoggedInUserID())
      .limit(1)

  console.log('Existing upvote data:', data)

  if (data?.length === 0) {
    const result = await supabase.rpc('upvotepost', { post: props.id })
    console.log('Upvote result:', result)
    postUpvoted.value = true
  } else {
    const result = await supabase.rpc('removeupvote', { post: props.id })
    console.log('Remove upvote result:', result)
    postUpvoted.value = false
  }
}

function quoteClicked(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  props.onQuote(props.id)
}

async function reportClicked(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  await supabase.rpc('reportpost', { post: props.id })
}

async function deleteClicked(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  await supabase.rpc('deletepost', { post_id: props.id })
  // @ts-expect-error: window is available in browser
  window.location.reload()
}
</script>

<template>
  <div class="flex items-start gap-4 mt-5 rounded-xl px-5 py-5 bg-purple-700 text-white hover:drop-shadow-2xl transition-all duration-300">
    <UserIcon v-if="userId" :id="userId" />

    <div class="flex-1">
      <NuxtLink :to="ref('/user?username=' + username)"><p class="text-lg font-semibold">{{ displayName }} <svg v-if="verified" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#2E282A" stroke="#44b3e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg></p></NuxtLink>
      <p class="text-sm text-gray-300">
        <NuxtLink :to="'/user?username=' + username">@{{ username }}</NuxtLink>
        <span class="ml-1" :class="levelColor">
        • Level {{ level }} ({{ getRankText(level) }})
      </span>
      </p>

      <NuxtLink :to="'/post?id=' + parentId" class="block">
        <div v-if="quotePost" class="ml-2">
          <p class="text-sm">Responding to:</p>
          <p class="text-sm">@{{ parentPoster }}</p>
          <p class="text-sm">{{ parentContent }}</p>
        </div>
      </NuxtLink>

      <p class="my-2 text-base hover:text-gray-200 cursor-pointer">{{ body }}</p>

      <ButtonGroup>
        <button
            @click="upvoteClicked"
            class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative text-white hover:text-gray-50"
            :class="postUpvoted ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-800 hover:bg-gray-700'"
        >
          Upvote
        </button>

        <button
            @click="quoteClicked"
            class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative text-white bg-gray-800 hover:bg-gray-700 hover:text-gray-50"
        >
          Quote
        </button>

        <button
            @click="reportClicked"
            class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative text-white bg-gray-800 hover:bg-gray-700 hover:text-gray-50"
        >
          Report
        </button>

        <button
            @click="deleteClicked"
            class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative text-white bg-gray-800 hover:bg-gray-700 hover:text-gray-50"
            v-if="postIsViewers"
        >
          Delete Post
        </button>

        <!-- Make the post content clickable to navigate to post -->
        <a :href="'/post?id=' + id">
          <button
              class="px-3 py-1.5 text-sm font-medium transition-colors focus:relative text-white bg-gray-800 hover:bg-gray-700 hover:text-gray-50"
          >
            Go to Post
          </button>
        </a>
      </ButtonGroup>
    </div>
  </div>
</template>

<style scoped>

</style>