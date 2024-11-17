// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image", "@nuxt/fonts"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        {
          rel: "preload",
          fetchpriority: "high",
          crossorigin: "anonymous",
          type: "font/woff2",
          href: "/fonts/Khand-Bold.woff2",
          as: "font",
        },
        {
          rel: "preload",
          fetchpriority: "high",
          crossorigin: "anonymous",
          type: "font/woff2",
          href: "/fonts/Switzer-Regular.woff2",
          as: "font",
        },
      ],
    },
  },

  fonts: {
    defaults: { styles: ["normal"] },
    families: [
      {
        name: "Khand",
        src: "/fonts/Khand-Bold.woff2",
        global: true,
        weight: 600,
      },
      {
        name: "Switzer",
        src: "/fonts/Switzer-Regular.woff2",
        global: true,
        weight: 400,
      },
    ],
  },

  css: ["~/assets/scss/_preflight.scss"],

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
