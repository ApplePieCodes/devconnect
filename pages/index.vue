<script setup lang="ts">

import Navbar from "~/server/components/Navbar.vue";
</script>

<template>
  <div class="bg-purple-950 min-h-screen">
    <Navbar/>
    <div class="relative place-items-center text-center">
      <div class="container px-6">
        <h1 class="text-8xl font-mono font-bold text-purple-500 drop-shadow-lg">
          DevConnect
        </h1>
        <h2 class="text-[1.92em] font-mono font-bold text-purple-400">
          The Social Media <i>for</i> Developers
        </h2>
        <p class="mt-5 text-xl text-purple-300 font-mono font-medium max-w-3xl mx-auto">
          DevConnect is a social media platform centered around developers, software development, hardware development, and all things tech.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>