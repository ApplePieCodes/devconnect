<template>
  <div class="bg-purple-950 min-h-screen flex flex-col mx-auto items-center justify-center">
    <Navbar />
    <div class="bg-purple-100/90 px-5 max-w-xl py-5 rounded-2xl">
      <h1 class="text-3xl font-bold font-mono">Sign Up for DevConnect</h1>
      <div class="flex flex-col">
        <LogicButton :action="signInWithGithub" class="font-mono bg-purple-600 hover:bg-purple-500 hover:text-gray-50 text-gray-50 mt-1 max-w-50 min-w-50 mx-auto">
          Sign In With GitHub
        </LogicButton>
        <LogicButton :action="signInWithDiscord" class="font-mono bg-purple-600 hover:bg-purple-500 hover:text-gray-50 text-gray-50 mt-1 max-w-50 min-w-50 mx-auto">
          Sign In With Discord
        </LogicButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogicButton from '~/server/components/LogicButton.vue'
import { supabase } from '~/server'
import Navbar from "~/server/components/Navbar.vue";

function getAuthCallbackUrl(): string {
  const origin = window.location.origin

  if (origin === 'https://applepiecodes.github.io') {
    return 'https://applepiecodes.github.io/devconnect/authcallback'
  }

  return `${origin}/authcallback`
}

async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: getAuthCallbackUrl(),
    },
  })
}

async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: getAuthCallbackUrl(),
    },
  })
}
</script>
