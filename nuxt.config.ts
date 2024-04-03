// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@nuxt/image", "@vueuse/nuxt"],
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
});
