<script setup lang="ts">
import {getLoggedInUserID, supabase} from "~/server"
import Navbar from '~/server/components/Navbar.vue'

// State
const profilePicturePreview = ref<string | null>(null)

async function onProfilePicChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const userId = await getLoggedInUserID()
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `profile-pictures/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          upsert: true, // overwrite existing
          contentType: file.type,
        })

    if (uploadError) {
      console.error('Upload failed:', uploadError.message)
      return
    }

    const { data: urlData } = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(filePath)

    profilePicturePreview.value = urlData.publicUrl

    // Save new URL to user profile
    await supabase
        .rpc('updatepfp', {url: urlData.publicUrl});
    window.location.reload();
  }
}


let ogDisplayName = ''
let ogUsername = ''
let ogBio = ''
let displayName = ref('');
let username = ref('');
let bio = ref('');

onMounted(async () => {
  var {data, error} = await supabase.from('users').select('*').eq('id', await getLoggedInUserID()).single();
  profilePicturePreview.value = data.pfp_url !== ''
      ? data.pfp_url
      : `https://api.dicebear.com/9.x/glass/svg?seed=${data.username}`
  displayName.value = data.display_name
  username.value = data.username
  bio.value = data.bio
  ogDisplayName = data.display_name
  ogUsername = data.username
  ogBio = data.bio
})

async function saveChanges() {
  if (ogDisplayName !== displayName.value) {
    await supabase.rpc('updatedisplayname', {name: displayName.value})
  }
  if (ogUsername !== username.value) {
    let {data, error} = await supabase.rpc('updateusername', {name: username.value})
  }
  if (ogBio !== bio.value) {
    await supabase.rpc('updatebio', {bio: bio.value})
  }

  window.location.assign(window.location.origin + '/devconnect/dashboard')
}

async function deleteSelf() {
  await supabase.rpc('deleteself');
  window.location.assign(window.location.origin + '/devconnect')
}
</script>

<template>
  <div class="bg-purple-950 min-h-screen text-white">
    <Navbar />
    <div class="max-w-3xl mx-auto px-6 py-10">
      <h1 class="text-3xl font-bold mb-6">Settings</h1>

      <div class="space-y-8">
        <!-- Profile Section -->
        <section>
          <h2 class="text-xl font-semibold mb-2">Profile</h2>
          <div class="space-y-4">
            <!-- Profile Picture -->
            <div>
              <label class="block mb-1">Profile Picture</label>
              <div class="flex items-center gap-4">
                <img
                    :src="profilePicturePreview || '/64x64.png'"
                    class="w-16 h-16 rounded-full object-cover border border-purple-700"
                />
                <input type="file" accept="image/*" @change="onProfilePicChange" />
              </div>
            </div>

            <!-- Display Name -->
            <div>
              <label class="block mb-1">Display Name</label>
              <input
                  type="text"
                  placeholder="Your name"
                  class="w-full p-2 rounded bg-purple-900 text-white border border-purple-700"
                  maxlength="32"
                  v-model="displayName"
              />
            </div>

            <!-- Username -->
            <div>
              <label class="block mb-1">Username</label>
              <input
                  type="text"
                  placeholder="Username"
                  class="w-full p-2 rounded bg-purple-900 text-white border border-purple-700"
                  maxlength="32"
                  v-model="username"
              />
            </div>

            <!-- Bio -->
            <div>
              <label class="block mb-1">Bio</label>
              <textarea
                  placeholder="Tell us about yourself..."
                  rows="4"
                  class="w-full p-2 rounded bg-purple-900 text-white border border-purple-700"
                  maxlength="500"
                  v-model="bio"
              />
            </div>
          </div>
        </section>

        <!-- Account Section -->
        <section>
          <h2 class="text-xl font-semibold mb-2">Account</h2>
          <div class="space-y-4">
            <button v-on:click="deleteSelf()" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
              Delete Account
            </button>
          </div>
        </section>

        <!-- Save Button -->
        <div class="text-right">
          <button v-on:click="saveChanges()" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
