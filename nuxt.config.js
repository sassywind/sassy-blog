import axios from "axios";

export default {
  target: process.env.NODE_ENV === "production" ? "static" : "server",
  mode: process.env.NODE_ENV === "staging" ? "universal" : "spa",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  generate: {
    async routes() {
      const pages = await axios
        .get("https://sassy.microcms.io/api/v1/blog?limit=100", {
          headers: { "X-API-KEY": "2f404a09-ae30-4adf-9df9-178602ea398c" }
        })
        .then(res =>
          res.data.contents.map(content => ({
            route: `/${content.id}`,
            payload: content
          }))
        );
      return pages;
    }
  }
};
