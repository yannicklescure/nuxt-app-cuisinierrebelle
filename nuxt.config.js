export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    // base: '/',
    // routeNameSplitter: '/',
    // middleware: 'trailingSlashRedirect',
    // trailingSlash: true,
    trailingSlash: false
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
        content: 'Partagez vos recettes dès maintenant en toute simplicité'
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
        content: 'Cuisinier Rebelle'
      }
    ],
    // canonical
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://cuisinierrebelle.com`
      },
      {
        rel: "preconnect",
        href: "https://api.cuisinierrebelle.com/",
        crossorigin: true
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
  // If you use other modules, always declare the sitemap module at end of array
  modules: [
    '@nuxtjs/axios',
    'nuxt-vuex-router-sync',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
    'nuxt-webfontloader',
    '@nuxtjs/toast',
    'vue-social-sharing/nuxt',
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
    Disallow: "/"
  },

  sitemap: {
    hostname: 'https://cuisinierrebelle.com',
    trailingSlash: false,
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    // routes: [
    //   '/page/1',
    //   '/page/2',
    //   {
    //     url: '/page/3',
    //     changefreq: 'daily',
    //     priority: 1,
    //     lastmod: '2017-06-30T13:30:00.000Z'
    //   }
    // ]
  },

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
    id: 'UA-155962082-1'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://www.cuisinierrebelle.com'
  }
}
