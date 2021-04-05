export default {

  // ssr: true,
  target: 'server',
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
    title: 'Cuisinier Rebelle, recettes sociales !',
    titleTemplate: 'Cuisinier Rebelle | %s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Partagez vos recettes dès maintenant en toute simplicité'
      },

      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@yanniclescure' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.cuisinierrebelle.com'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Cuisinier Rebelle'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Partagez vos recettes dès maintenant en toute simplicité'
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
      { hid: 'og:site_name', property: 'og:site_name', content: 'Cuisinier_Rebelle' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.cuisinierrebelle.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Cuisinier Rebelle'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Partagez vos recettes dès maintenant en toute simplicité'
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
        content: 'Cuisinier_Rebelle'
      }
    ],
    // canonical
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://www.cuisinierrebelle.com`
      }
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@aceforth/nuxt-optimized-images',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    ['@nuxtjs/fontawesome', {
        icons: {
          brands: ['faFacebookF', 'faTelegramPlane', 'faTwitter', 'faVk', 'faWhatsapp'],
          solid: ['faEnvelope'],
        }
      }
    ]
  ],

  eslint: {
    // fix: true
  },

  optimizedImages: {
    optimizeImages: true
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: 'https://api.cuisinierrebelle.com'
    }
  },

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
      // short_name: 'CR',
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
    // apiUrl: 'http://localhost:3000'
  }
}
