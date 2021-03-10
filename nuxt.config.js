export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/',
    routeNameSplitter: '/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  // head: {
  //   title: 'Cuisinier Rebelle',
  //   htmlAttrs: {
  //     lang: 'fr'
  //   },
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: '' }
  //   ],
  //   link: [
  //     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //   ]
  // },
  head: {
    title: 'Cuisinier Rebelle, Recettes Sociales',
    titleTemplate: '%s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Partagez vos recettes dès maintenant en toute simplicité'
      },

      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@yannicklescure' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://cuisinierrebelle.com'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Cuisinier Rebelle, Recettes Sociales'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Partagez vos recettes dès maintenant en toute simplicité'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'
      },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '570259036897585'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Cuisinier Rebelle' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://cuisinierrebelle.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Cuisinier Rebelle, Recettes Sociales'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Partagez vos recettes dès maintenant en toute simplicité'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Cuisinier Rebelle'
      }
    ],
    // canonical
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://cuisinierrebelle.com`
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/stylesheets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/vue-social-sharing.js',
    '~/plugins/vuejs-dialog.client',
    // '~/plugins/vue-google-adsense',
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vuex-cache.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    ['@nuxtjs/fontawesome', {
        icons: {
          brands: ['faFacebookF', 'faTelegramPlane', 'faTwitter', 'faVk', 'faWhatsapp'],
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
  // Modules - https://cuisinierrebelle.com/docs/2.x/directory-structure/modules
  modules: [
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'nuxt-i18n',
    'vue-social-sharing/nuxt',
    '@nuxtjs/google-adsense',
  ],

  'google-adsense': {
    id: 'ca-pub-9223566768445571',
    analyticsUacct: 'UA-155962082-1',
  },

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
    // register: [ // Register custom toasts
    //   {
    //     name: 'my-error',
    //     message: 'Oops...Something went wrong',
    //     options: {
    //       type: 'error'
    //     }
    //   }
    // ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
  },

  // https://pwa.nuxtjs.org/manifest
  pwa: {
    manifest: {
      name: 'Cuisinier Rebelle',
      lang: 'fr',
      useWebmanifestExtension: false
    }
  },

  googleAnalytics: {
    id: 'UA-155962082-1'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://www.cuisinierrebelle.com'
  }
}
