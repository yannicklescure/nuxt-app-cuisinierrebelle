export default {

  ssr: true,
  resourceHints: true,

  router: {
    trailingSlash: false,
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue')
    //   })
    // }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: `https://www.cuisinierrebelle.com` },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/stylesheets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/vuejs-dialog.client.js' },
    { src: '~/plugins/persistedState.client.js' },
    // { src: '~/plugins/vuex-persist.js', ssr: false },
    // { src: '~/plugins/vuex-cache.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@aceforth/nuxt-optimized-images',
    ['@nuxtjs/fontawesome', {
        icons: {
          brands: ['faFacebookF', 'faTelegramPlane', 'faTwitter', 'faVk', 'faWhatsapp'],
          solid: ['faEnvelope'],
        }
      }
    ]
  ],

  optimizedImages: {
    optimizeImages: true
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: 'https://api.cuisinierrebelle.com'
  //   }
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  // Modules - https://www.cuisinierrebelle.com/docs/2.x/directory-structure/modules
  // If you use other modules, always declare the sitemap module at end of array

  modules: [
    '@nuxtjs/axios',
    'nuxt-brotli',
    'nuxt-vuex-router-sync',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
    'nuxt-webfontloader',
    '@forked-prs/nuxt-infinite-scroll-module',
    'vue-social-sharing/nuxt',
    '@nuxtjs/toast',
    '@nuxtjs/google-adsense',
    "@nuxtjs/robots",
    '@nuxtjs/sitemap'
  ],

  webfontloader: {
    custom: {
      families: [
        'Material+Icons',
        'Roboto:n3,n4,n7'
      ],
      urls: [
        // for each Google Fonts add url + options you want
        // here add font-display option
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap'
      ]
    }
  },

  robots: {
    UserAgent: "*",
    Disallow: "/admin"
  },

  sitemap: {
    hostname: 'https://www.cuisinierrebelle.com',
    trailingSlash: false,
    gzip: true,
    exclude: [
      '/admin/**'
    ],
  },

  'google-adsense': {
    id: 'ca-pub-9223566768445571',
    analyticsDomainName: 'cuisinierrebelle.com',
    analyticsUacct: 'UA-155962082-1',
    // onPageLoad: true,
  },

  i18n: {
    locales: [
      // { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
    ],
    lazy: true,
    langDir: '~/locales/',
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
  },

  toast: {
    position: 'bottom-center',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimizeCSS: true,
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        },
      },
    },
  },

  // https://pwa.nuxtjs.org/manifest
  pwa: {
    meta: {
      name: 'Cuisinier Rebelle',
      description: 'Partagez vos recettes dès maintenant en toute simplicité',
      lang: 'fr',
    },
    manifest: {
      name: 'Cuisinier Rebelle',
      short_name: 'CR',
      lang: 'fr',
      useWebmanifestExtension: false
    }
  },

  googleAnalytics: {
    id: 'UA-155962082-1',
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://www.cuisinierrebelle.com',
    apiUrl: 'https://api.cuisinierrebelle.com'
  }
}
