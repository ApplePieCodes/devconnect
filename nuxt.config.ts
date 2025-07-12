import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/devconnect/',

    head: {
      script: [
        {src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"}
      ]
    }
  },
  compatibilityDate: '2025-07-11',
})