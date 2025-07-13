<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { supabase } from "~/server";
  import UserIcon from "~/server/components/UserIcon.vue";

  const loggedIn = ref(false);
  const loggedInUserId = ref('');

  onMounted(async () => {
    const { data } = await supabase.auth.getUser();
    loggedInUserId.value = data.user?.id || '';
    loggedIn.value = !!data.user;
  })
</script>

<template>
  <div class="pb-14">
    <nav class="z-50 fixed top-0 left-0 right-40 bg-background/80 backdrop-blur-sm border-b min-w-screen">
      <div class="container mx-auto">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center justify-between">
            <NuxtLink href="/" class="text-4xl ml-5 font-mono font-bold transition-colors text-purple-100 hover:text-purple-300 transition-all duration-300 hover:drop-shadow-2xl">DevConnect</NuxtLink>
            <NuxtLink href="/dashboard" class="text-xl mt-1 ml-5 font-mono transition-colors text-purple-100 hover:text-purple-300 transition-all duration-300 hover:drop-shadow-2xl">Dashboard</NuxtLink>
          </div>
          <div class="mr-5">
            <NuxtLink to="/signup" class="bg-purple-500 text-purple-100 px-4 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl" v-if="!loggedIn">Sign Up</NuxtLink>

            <UserIcon v-else :id="loggedInUserId" class="transition-all duration-300 hover:drop-shadow-2xl"/>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>