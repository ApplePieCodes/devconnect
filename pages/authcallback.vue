<script setup lang="ts">
import { onMounted } from 'vue'
import Spinner from '~/server/components/Spinner.vue'
import {getLoggedInUserID, supabase} from '~/server'
import Navbar from "~/server/components/Navbar.vue";

onMounted(async () => {
  const id = await getLoggedInUserID();

  const { data, error } = await supabase.rpc('createuserifnotexists', {
    auth_id: id,
  })


  window.location.replace(window.location.origin + '/devconnect/dashboard')
})
</script>

<template>
  <div class="flex flex-col place-items-center text-center bg-purple-950 min-h-screen justify-center items-center">
    <Navbar/>
    <div class="mb-20 flex flex-col">
      <Spinner fill="fill-purple-400" :width="5" :height="5" />
      <h1 class="text-8xl mt-10 font-mono font-bold text-purple-500 drop-shadow-2xl">
        Hold Tight
      </h1>
      <h2 class="text-3xl font-mono font-bold text-purple-400">
        We're attempting to verify your authentication.
      </h2>
    </div>
  </div>
</template>