<script setup lang="ts">
import {getLevelColor, getLoggedInUserID, getRankText, supabase} from "~/server";
  import ButtonGroup from "~/server/components/ButtonGroup.vue";
  import UserIcon from "~/server/components/UserIcon.vue";
  import {ref} from "vue";
  import Navbar from "~/server/components/Navbar.vue";
  import PostCard from "~/server/components/PostCard.vue";
import QuoteModal from "~/server/components/QuoteModal.vue";

  const postId = ref<string | null>()
  const postExists = ref<boolean>(true);
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
    if (!id) {
      postExists.value = false
      return;
    }
    console.log(id)

    postId.value = id

    var {data: p_data, error: p_error} = await supabase.from('posts').select('*').eq('id', postId.value).single();

    if (!p_data || p_error) {
      postExists.value = false
      return;
    }

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
    <div v-if="(postId != null) && postExists">
      <PostCard :id="postId" :on-quote="openQuoteModal" class="mx-10 xl:mx-50"/>
      <div class="px-80">
        <PostCard v-for="quote in quotes" :key="quote" :id="quote" :on-quote="openQuoteModal"/>
      </div>
    </div>
    <div v-else class="flex justify-center flex-col">
      <h1 class="text-center text-6xl text-white font-bold font-mono mt-75">Post Not Found :(</h1>
      <NuxtLink to="/dashboard" class="xl:text-xl bg-purple-500 inline-block text-purple-100 px-6 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl mx-auto mt-5">Go to Dashboard</NuxtLink>
    </div>
    <QuoteModal :id="selectedPostId" :close-modal="closeQuoteModal" v-if="showQuoteModal"/>
  </div>
</template>