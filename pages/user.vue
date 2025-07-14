<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase, getLevelColor, getRankText, getLoggedInUserID } from '~/server'
import UserIcon from '~/server/components/UserIcon.vue'
import PostCard from '~/server/components/PostCard.vue'
import QuoteModal from '~/server/components/QuoteModal.vue'
import FollowButton from '~/server/components/FollowButton.vue'
import Navbar from "~/server/components/Navbar.vue";

const userId = ref('')
const displayName = ref('')
const username = ref('')
const level = ref(0)
const bio = ref('')
const posts = ref<string[]>([])
const levelColor = ref('')
const followText = ref('Follow')
const isFollowing = ref(false)
const displayFollowButton = ref(false)
const selectedPostId = ref('')
const showQuoteModal = ref(false)

const openQuoteModal = (post: string) => {
  selectedPostId.value = post
  showQuoteModal.value = true
}

const closeQuoteModal = () => {
  showQuoteModal.value = false
}

const followToggle = async () => {
  if (!isFollowing.value) {
    await supabase.rpc('follow', { follow_user: userId.value })
    isFollowing.value = true
    followText.value = 'Unfollow'
  } else {
    await supabase.rpc('unfollow', { unfollow_user: userId.value })
    isFollowing.value = false
    followText.value = 'Follow'
  }
}

const verified = ref(false)

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const uname = params.get('username')
  if (!uname) return

  username.value = uname

  const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', uname)
      .single()

  if (!data || error) return

  displayName.value = data.display_name
  level.value = data.level
  bio.value = data.bio ?? ''
  levelColor.value = getLevelColor(data.level)
  userId.value = data.id
  verified.value = data.verified

  const currentUserId = await getLoggedInUserID()

  if (userId.value !== currentUserId) {
    displayFollowButton.value = true
    const { data: followData } = await supabase
        .from('followers')
        .select('*')
        .eq('follower', currentUserId)
        .eq('user', userId.value)
        .limit(1)

    if (followData && followData.length > 0) {
      isFollowing.value = true
      followText.value = 'Unfollow'
    }
  }

  const { data: userPosts } = await supabase
      .from('posts')
      .select('*')
      .eq('poster', data.id)
      .order('posted', { ascending: false })

  if (userPosts) {
    posts.value = userPosts.map(post => post.id)
  }
})
</script>

<template>
  <div class="bg-purple-950 min-h-screen">
    <Navbar/>
    <div class="pt-10 mx-auto max-w-2xl px-6">
      <div class="flex items-center gap-4 mb-6">
        <UserIcon v-if="userId" :id="userId" />
        <div>
          <h1 class="text-2xl font-bold text-white">{{ displayName }} <svg v-if="verified" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2E282A" stroke="#44b3e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg></h1>
          <p class="text-gray-400">@{{ username }}</p>
          <p class="mt-1" :class="levelColor">
            Level {{ level }} • {{ getRankText(level) }}
            <FollowButton
                v-if="displayFollowButton"
                :action="followToggle"
                foreground="text-white"
                background="bg-gray-800"
                foregroundHover="hover:text-gray-50"
                backgroundHover="hover:bg-gray-700"
            >
              {{ followText }}
            </FollowButton>
          </p>
        </div>
      </div>

      <div class="bg-purple-800 text-white p-4 rounded mb-6">
        <p class="whitespace-pre-line">{{ bio }}</p>
      </div>

      <h2 class="text-xl font-semibold text-white mb-2">Posts</h2>
      <div v-if="posts.length > 0">
        <PostCard
            v-for="post in posts"
            :key="post"
            :id="post"
            :onQuote="openQuoteModal"
        />
      </div>
      <p v-else class="text-gray-400">No posts yet.</p>

      <QuoteModal
          v-if="showQuoteModal"
          :id="selectedPostId"
          :closeModal="closeQuoteModal"
      />
    </div>
  </div>
</template>
