<template>
  <div class="bg-purple-950 min-h-screen">
    <div class="flex flex-col max-w-2xl mx-auto" v-if="posts.length > 0">
      <Navbar/>
      <PostCard
          v-for="post in posts"
          :key="post"
          :id="post"
          :onQuote="() => openQuoteModal(post)"
      />
    </div>
    <div class="flex flex-col max-w-2xl mx-auto text-center min-h-screen justify-center items-center place-items-center" v-else>
      <Navbar/>
      <p class="text-2xl font-mono font-bold mb-30 text-purple-100">Nothing here yet. Start posting!</p>
    </div>

    <QuoteModal
        v-if="showQuoteModal"
        :id="selectedPostId"
        :closeModal="closeQuoteModal"
    />

    <PostButton :openPostModal="() => (showPostModal = true)" />

    <PostModal
        v-if="showPostModal"
        :closeModal="closePostModal"
    />

    <div id="bottom_sentinel" ref="bottomSentinel"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostCard from '~/server/components/PostCard.vue'
import QuoteModal from '~/server/components/QuoteModal.vue'
import PostButton from '~/server/components/PostButton.vue'
import PostModal from '~/server/components/PostModal.vue'
import { getPostsOlderThan } from '~/server'
import Navbar from "~/server/components/Navbar.vue";

const posts = ref<string[]>([])
let lastTime = new Date().toISOString()

const showQuoteModal = ref(false)
const showPostModal = ref(false)
const selectedPostId = ref('')

const bottomSentinel = ref<HTMLElement | null>(null)

async function openQuoteModal(post: string) {
  selectedPostId.value = post
  showQuoteModal.value = true
}

function closeQuoteModal() {
  showQuoteModal.value = false
}

function closePostModal() {
  showPostModal.value = false
}

async function onBottomReached() {
  const feed = await getPostsOlderThan(lastTime, 20)
  if (feed.length > 0) {
    lastTime = feed[feed.length - 1].posted
    for (const post of feed) {
      posts.value.push(post.id)
    }
  }
}

function observeBottom() {
  if (!bottomSentinel.value) return

  const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onBottomReached()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
  )

  observer.observe(bottomSentinel.value)
}

onMounted(() => {
  observeBottom()
})
</script>
