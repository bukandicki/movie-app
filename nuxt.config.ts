// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  css: ["~/assets/scss/_preflight.scss"],

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
