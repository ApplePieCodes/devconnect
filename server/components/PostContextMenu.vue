<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-purple-500 px-2 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-inset hover:bg-purple-400">
        <Ellipsis/>
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button
                @click="props.report"
                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
            >
              <div class="flex items-center gap-2">
                <Flag class="w-4 h-4" />
                Report Post
              </div>
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
                @click="props.delete"
                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
            >
              <div class="flex items-center gap-2">
                <Trash2 class="w-4 h-4" />
                Delete Post
              </div>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {Ellipsis, Flag, Trash2} from "lucide-vue-next";


const props = defineProps<{
  report: () => void
  delete: () => void
}>()
</script>