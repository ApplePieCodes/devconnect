<script setup lang="ts">
import Navbar from "~/server/components/Navbar.vue";
import {supabase} from "~/server"

let signedIn = ref(false);

onMounted(async () => {

  let {data, error} = await supabase.auth.getUser();

  if (!data.user) {
    signedIn.value = true;
  }
})
</script>

<template>
  <div class="bg-purple-950 min-h-screen">
    <Navbar/>
    <div class="mt-30 flex flex-col">
      <div class="text-center">
        <h1 class="text-8xl font-mono font-bold text-purple-500 drop-shadow-2xl">
          DevConnect
        </h1>
        <h2 class="font-mono text-purple-400 text-3xl">
          The Social Media <i>for</i> Developers
        </h2>
        <p class="mt-2 text-xl text-purple-300 font-mono mx-auto max-w-xl">
          DevConnect is a social media platform centered around developers, software development, hardware development, and all things tech.
        </p>

        <section class="mt-10 text-left">
          <div class="max-w-6xl mx-auto grid gap-12 grid-cols-3">
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono mb-1 text-purple-100">Dev-Focused</h3>
              <p class="text-purple-100 font-mono">Built specifically for developers with tech related tags for posts.</p>
            </div>
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono mb-1 text-purple-100">Clean & Minimal</h3>
              <p class="text-purple-100 font-mono">Unintrusive ads, clean design and open-source. <span class="font-bold">You</span> can contribute!</p>
            </div>
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono mb-1 text-purple-100">Find Work</h3>
              <p class="text-purple-100 font-mono">Advertise freelance programming or look for teams.</p>
            </div>
          </div>
        </section>

        <section class="pt-8">
          <h2 class="text-4xl font-bold font-mono mb-4 text-purple-100">Join the community</h2>
          <p class="text-lg mb-8 text-purple-100 font-mono">Start sharing your builds, ideas, and tools with other developers.</p>
          <NuxtLink to="/signup" v-if="signedIn" class="bg-purple-500 text-purple-100 px-6 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl">Sign Up</NuxtLink>
          <NuxtLink to="/dashboard" v-else class="bg-purple-500 text-purple-100 px-6 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl">Go to Dashboard</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>