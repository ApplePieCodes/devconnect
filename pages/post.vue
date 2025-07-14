<script setup lang="ts">
import {getLevelColor, getLoggedInUserID, getRankText, supabase} from "~/server";
  import ButtonGroup from "~/server/components/ButtonGroup.vue";
  import UserIcon from "~/server/components/UserIcon.vue";
  import {ref} from "vue";
  import Navbar from "~/server/components/Navbar.vue";
  import PostCard from "~/server/components/PostCard.vue";
import QuoteModal from "~/server/components/QuoteModal.vue";

  const postId = ref<string | null>()
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
  const parentId = ref('')
  const quotes = ref<string[]>([]);

  onMounted(async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (!id) return
    console.log(id)

    postId.value = id

    var {data: p_data, error: p_error} = await supabase.from('posts').select('*').eq('id', postId.value).single();

    body.value = p_data.content;
    userId.value = p_data.poster;

    var {data: u_data, error: u_error} = await supabase.from('users').select('*').eq('id', userId.value).single();

    displayName.value = u_data.display_name;
    username.value = u_data.username;
    level.value = u_data.level;
    levelColor.value = getLevelColor(level.value);

    var {data: up_data, error: up_error} = await supabase.from('upvotes').select('*').eq('post_id', postId.value).eq('user_id', await getLoggedInUserID());

    if (up_data.length > 0) {
      postUpvoted.value = true
    }

    if (p_data.parent) {
      quotePost.value = true

      parentId.value = p_data.parent;

      const { data: parentPostData } = await supabase.from('posts').select('*').eq('id', p_data.parent).limit(1)
      const { data: parentUserData } = await supabase.from('users').select('*').eq('id', parentPostData?.[0]?.poster).limit(1)

      parentPoster.value = parentUserData?.[0]?.username || ''
      parentContent.value = parentPostData?.[0]?.content || ''
    }
    if (p_data.poster === await getLoggedInUserID()) {
      postIsViewers.value = true
    }


    var {data: q_data, error: q_error} = await supabase.from('posts').select('*').eq('parent', postId.value).order('total_popularity');
    for (var quote of q_data) {
      quotes.value.push(quote.id);
    }
  })

  async function upvoteClicked() {
    const { data } = await supabase
        .from('upvotes')
        .select('*')
        .eq('post_id', postId.value)
        .eq('user_id', await getLoggedInUserID())
        .limit(1)

    if (data?.length === 0) {
      const result = await supabase.rpc('upvotepost', { post: postId.value })
      postUpvoted.value = true
    } else {
      const result = await supabase.rpc('removeupvote', { post: postId.value })
      postUpvoted.value = false
    }
  }

  function quoteClicked() {
    openQuoteModal(postId.value)
  }

  async function reportClicked() {
    await supabase.rpc('reportpost', { post: postId.value })
  }

  async function deleteClicked() {
    await supabase.rpc('deletepost', { post_id: postId.value })
    window.location.reload()
  }

  const showQuoteModal = ref(false)
  const selectedPostId = ref('')

  async function openQuoteModal(post: string) {
    selectedPostId.value = post
    showQuoteModal.value = true
  }

  function closeQuoteModal() {
    showQuoteModal.value = false
  }
</script>

<template>
  <div class="bg-purple-950 min-h-screen">
    <Navbar/>
    <div class="mx-50 flex items-start gap-4 mt-5 rounded-xl px-5 py-5 bg-purple-700 text-white hover:drop-shadow-2xl transition-all duration-300">
      <UserIcon v-if="userId" :id="userId" />

      <div>
        <NuxtLink :to="'/user?username=' + username"><p class="text-lg font-semibold">{{ displayName }} <svg v-if="verified" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#2E282A" stroke="#44b3e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg></p></NuxtLink>
        <p class="text-sm text-gray-300">
          <NuxtLink :to="'/user?username=' + username">@{{ username }}</NuxtLink>
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
        </ButtonGroup>
      </div>
    </div>
    <div class="px-80">
      <PostCard v-for="quote in quotes" :key="quote" :id="quote" :on-quote="openQuoteModal"/>
    </div>
    <QuoteModal :id="selectedPostId" :close-modal="closeQuoteModal" v-if="showQuoteModal"/>
  </div>
</template>