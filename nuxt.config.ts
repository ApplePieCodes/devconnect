
export default defineNuxtConfig({
  app: {
    baseURL: '/devconnect/',

    head: {
      script: [
        {src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"}
      ],
      link: [
        {rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"},
      ]
    }
  },
  nitro: {
    preset: 'static' // ensure static output
  },
  compatibilityDate: '2025-07-11',
})