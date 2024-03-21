// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts"],
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
});
