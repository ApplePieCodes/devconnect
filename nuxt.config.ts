import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/devconnect/',
    head: {
      link: [
        {rel: 'stylesheet', href: 'app.css'}
      ]
    }
  },
})