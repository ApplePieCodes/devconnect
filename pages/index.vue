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
    <div class="mt-5">
      <div class="text-center">
        <h1 class="text-6xl lg:text-8xl font-mono font-bold text-purple-500 drop-shadow-2xl">
          DevConnect
        </h1>
        <h2 class="text-xl lg:text-3xl font-mono text-purple-400">
          The Social Media <i>for</i> Developers
        </h2>
        <p class="text-lg lg:text-2xl lg:mx-10 font-mono text-purple-300 mt-2 mx-2">
          DevConnect is a social media platform centered around developers, software development, hardware development, and all things tech.
        </p>

        <section class="mt-5 mx-10 md:mx-20">
          <div class="grid gap-5 grid-cols-1 lg:grid-cols-3">
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono text-purple-100">Dev-Focused</h3>
              <p class="text-purple-100 font-mono">Built specifically for developers with tech related tags for posts.</p>
            </div>
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono text-purple-100">Clean & Minimal</h3>
              <p class="text-purple-100 font-mono">Unintrusive ads, clean design and open-source. <span class="font-bold">You</span> can contribute!</p>
            </div>
            <div class="bg-purple-800 px-5 py-5 rounded-2xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out">
              <h3 class="text-3xl font-bold font-mono text-purple-100">Find Work</h3>
              <p class="text-purple-100 font-mono">Advertise freelance programming or look for teams.</p>
            </div>
          </div>
        </section>

        <section class="pt-5 pb-10">
          <h2 class="text-3xl xl:text-6xl font-bold font-mono mb-2 text-purple-100">Join the community</h2>
          <p class="text-lg xl:text-2xl mb-4 mx-5 text-purple-100 font-mono">Start sharing your builds, ideas, and tools with other developers.</p>
          <NuxtLink to="/signup" v-if="signedIn" class="xl:text-xl bg-purple-500 inline-block text-purple-100 px-6 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl">Sign Up</NuxtLink>
          <NuxtLink to="/dashboard" v-else class=" xl:text-xl bg-purple-500 inline-block text-purple-100 px-6 py-3 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl">Go to Dashboard</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>