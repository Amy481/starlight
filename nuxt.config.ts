// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSignSecret: process.env.JWT_SIGN_SECRET,
    rememberMeEncryptionKey: process.env.REMEMBER_ME_ENCRYPTION_KEY,
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "~/assets/css/main.css",
  ],
  modules: ["@nuxt/image", "@vee-validate/nuxt", "@pinia/nuxt"],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VForm",
      Field: "VField",
      FieldArray: "VFieldArray",
      ErrorMessage: "VErrorMessage",
    },
  },
});
