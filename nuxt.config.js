export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-app-cuisinierrebelle',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/stylesheets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuejs-dialog.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    ['@nuxtjs/fontawesome', {
        icons: {
          brands: ['faTwitter', 'faInstagram', 'faYoutube'],
          solid: ['faEnvelope'],
        }
      }
    ]
  ],

  publicRuntimeConfig: {
    axios: {
      baseURL: 'https://api.cuisinierrebelle.com'
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  // Modules - https://nuxtjs.org/docs/2.x/directory-structure/modules
  modules: [
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'nuxt-i18n',
  ],

  i18n: {
    locales: [
      { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'fr'
  },

  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // https://pwa.nuxtjs.org/manifest
  pwa: {
    manifest: {
      name: 'Yannick Lescure',
      lang: 'fr',
      useWebmanifestExtension: false
    }
  },

  googleAnalytics: {
    id: 'UA-155962082-1'
  }
}
