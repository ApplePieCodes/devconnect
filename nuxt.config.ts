
export default defineNuxtConfig({
  app: {
    baseURL: '/devconnect/',

    head: {
      script: [
        {src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"}
      ]
    }
  },
  nitro: {
    preset: 'static' // ensure static output
  },
  compatibilityDate: '2025-07-11',
})