<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { supabase } from "~/server";
  import UserIcon from "~/server/components/UserIcon.vue";
  import { Settings } from 'lucide-vue-next';

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
    <nav class="z-100 fixed top-0 left-0 right-40 bg-background/70 backdrop-blur-sm border-b min-w-screen">
      <div class="mx-auto">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center justify-between">
            <NuxtLink href="/dashboard" class="text-4xl ml-5 font-mono font-bold transition-colors text-purple-100 hover:text-purple-300 transition-all duration-300 hover:drop-shadow-2xl">DevConnect</NuxtLink>
          </div>
          <div class="mr-5">
            <NuxtLink to="/signup" class="bg-purple-500 text-purple-100 px-4 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl" v-if="!loggedIn">Sign Up</NuxtLink>

            <div v-else class="flex items-center gap-2">
              <NuxtLink to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-all duration-300 hover:drop-shadow-2xl px-0.5 py-0.5 hover:bg-purple-600 rounded-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></NuxtLink>
              <UserIcon :id="loggedInUserId" class="transition-all duration-300 hover:drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>