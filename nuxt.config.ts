// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000;

export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },

  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.BASE_API_URL || "https://api-dev.layerapps.id",
      cookieName: "__session",
      cookieExpires: ONE_DAY.toString(),
    },
  },

  css: ["~/assets/css/variabel.css", "~/assets/css/global.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  typescript: {
    typeCheck: true,
  },

  colorMode: {
    preference: "light",
  },

  googleFonts: {
    display: "swap",
    families: {
      Inter: {
        wght: [300, 400, 500, 600, 700],
      },
      Poppins: {
        wght: [500],
      },
    },
  },

  image: {
    format: ["webp"],
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  compatibilityDate: "2025-02-16",
});