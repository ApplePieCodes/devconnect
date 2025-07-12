<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { supabase } from "~/server";
  import UserIcon from "~/server/components/UserIcon.vue";
  import CustomButton from "~/server/components/CustomButton.vue";
  import ButtonGroup from "~/server/components/ButtonGroup.vue";

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
            <a href="" class="text-4xl ml-5 font-mono font-bold transition-colors text-purple-100 hover:text-purple-300">DevConnect</a>
            <a href="dashboard" class="text-xl mt-1 ml-5 font-mono transition-colors text-purple-100 hover:text-purple-300">Dashboard</a>
          </div>
          <div class="mr-5">
            <ButtonGroup v-if="!loggedIn">
              <CustomButton
                  link="signup"
                  text="Sign up"
                  foreground="text-gray-50"
                  foreground-hover="hover:text-gray-200"
                  background="bg-gray-800"
                  background-hover="hover:bg-gray-600"
              />
              <CustomButton
                  link="login"
                  text="Log in"
                  foreground="text-gray-50"
                  foreground-hover="hover:text-gray-200"
                  background="bg-purple-600"
                  background-hover="hover:bg-purple-500"
              />
            </ButtonGroup>

            <UserIcon v-else :id="loggedInUserId" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>