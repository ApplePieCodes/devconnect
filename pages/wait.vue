<script setup lang="ts">

import Navbar from "~/server/components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-purple-950">
    <Navbar/>
    <div class="text-center px-4 py-8">
      <h1 class="text-purple-100 text-6xl md:text-8xl font-mono font-bold mb-6">Welcome to DevConnect!</h1>
      <p class="text-purple-100 text-lg md:text-2xl font-mono font-bold mb-8 max-w-4xl mx-auto">I made this platform by myself in about a month, even having to rewrite it twice and move from Svelte to Vue. I spend a long time working on these projects and I have only 2 things to ask of you before you continue. If you have the spare change to, consider donating to me at <a href="https://buymeacoffee.com/alulamakestuff" class="text-purple-300 hover:text-purple-200 underline">Buy Me a Coffee</a>. Also, Follow these rules while on DevConnect.</p>

      <div class="max-w-6xl mx-auto text-left">
        <h2 class="text-purple-100 text-4xl font-mono font-bold mb-6 text-center">Community Rules</h2>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-purple-900 rounded-lg p-6">
            <h3 class="text-purple-100 text-2xl font-mono font-bold mb-4">Basic Conduct</h3>
            <ul class="text-purple-200 space-y-2 font-mono">
              <li>• No Hate Speech: Everyone is welcome on DevConnect (Unless they themselves are being hateful.)</li>
              <li>• Stay Civil: Try to treat everyone with respect and kindness.</li>
              <li>• Don't Mislead: Keep away from clickbait.</li>
              <li>• No Politics: Self Explanatory. If you want to get into arguments unrelated to programming, go to twitter.</li>
              <li>• No Spam/Self Promo: While a bit of self promotion is ok, you should generally have a majority of your posts being community contribution.</li>
            </ul>
          </div>

          <div class="bg-purple-900 rounded-lg p-6">
            <h3 class="text-purple-100 text-2xl font-mono font-bold mb-4">Quality Standards</h3>
            <ul class="text-purple-200 space-y-2 font-mono">
              <li>• When answering questions, explain the "why" not just the "what"</li>
              <li>• Point newcomers to appropriate resources</li>
              <li>• Always attribute code, ideas, or solutions to their original authors</li>
              <li>• Link to sources when sharing tutorials or articles</li>
              <li>• Include relevant context (language, framework, error messages)</li>
              <li>• Show what you've already tried when asking for help</li>
            </ul>
          </div>
        </div>

        <div class="bg-purple-900 rounded-lg p-6 mb-8">
          <h3 class="text-purple-100 text-2xl font-mono font-bold mb-4">Enforcement & Consequences</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-purple-200 text-xl font-mono font-bold mb-2">Warning System</h4>
              <ul class="text-purple-200 space-y-1 font-mono">
                <li>• First offense: Friendly reminder about community standards</li>
                <li>• Second offense: Formal warning with rule clarification</li>
                <li>• Continued violations: Permanent ban</li>
              </ul>
            </div>
            <div>
              <h4 class="text-purple-200 text-xl font-mono font-bold mb-2">Immediate Ban Offenses</h4>
              <ul class="text-purple-200 space-y-1 font-mono">
                <li>• Doxxing or sharing personal information</li>
                <li>• Spam or malicious content</li>
                <li>• Impersonation of other users or companies (parody accounts are acceptable if labeled as such in bio)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center">
          <p class="text-purple-200 text-lg font-mono">Let's build an amazing developer community together! 🚀</p>
          <NuxtLink to="/dashboard"><button class="bg-purple-500 text-purple-100 px-6 py-3 mt-5 rounded-2xl font-bold font-mono hover:bg-purple-600 transition-all duration-300 hover:drop-shadow-2xl">Go To Dashboard</button></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>