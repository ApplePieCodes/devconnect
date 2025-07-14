<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '~/server'

const props = defineProps<{ id: string }>()

const pic = ref('128x128.png')
const url = ref('')

onMounted(async () => {
  const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', props.id)
      .limit(1)

  if (data && data.length > 0) {
    const user = data[0]
    pic.value = user.pfp_url !== ''
        ? user.pfp_url
        : `https://api.dicebear.com/9.x/glass/svg?seed=${user.username}`
    url.value = `/devconnect/user?username=${user.username}`
  }
})
</script>

<template>
  <a :href="url">
    <img :src="pic" alt="Profile" class="w-12 rounded-full object-cover" />
  </a>
</template>

<style scoped>

</style>