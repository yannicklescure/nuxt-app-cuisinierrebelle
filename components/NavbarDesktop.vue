<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="['d-print-none navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white mb-3']"
    >
    <div class="d-flex align-items-center">
      <NuxtLink
        to="/"
        class="navbar-brand d-flex align-items-center text-body"
        @click.native="scroll2Top"
      >
        <img :src="'https://media.cuisinierrebelle.com/brand-icon.jpg'" width="32" height="32" class="mr-1">
        <span>{{ $t('navbar.brand') }}</span>
      </NuxtLink>
    </div>
    <div class="input-group d-flex w-25">
      <input
        v-model="searchQuery"
        v-on:keyup.enter="validSearchQuery"
        type="search"
        class="form-control"
        :placeholder="$t('navbar.search')"
        ref="searchInput"
      >
    </div>
    <div class="d-flex align-items-center">
      <div
        v-if="isAuthenticated"
        class="d-flex align-items-center"
      >
        <NuxtLink to="/top100" class="nav-item mx-2 text-fire text-decoration-none">
          <i class="material-icons md-18 d-flex">whatshot</i>
        </NuxtLink>
        <NuxtLink to="/bookmarks" class="nav-item mx-2 text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">bookmarks</i>
        </NuxtLink>
        <NuxtLink to="/notifications" class="nav-item mx-2 text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">notifications_none</i>
        </NuxtLink>
        <div class="nav-item mx-2 dropdown">
          <div class="text-body mouse-pointer" role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="material-icons md-18 d-flex">more_vert</i>
          </div>
          <div class="dropdown-menu dropdown-menu-md-right" aria-labelledby="navbarDropdown">
            <div class="border-bottom pb-2 mb-2" v-if="currentUser.admin">
              <NuxtLink class="dropdown-item" :to="'/admin'">{{ $t('navbar.admin') }}</NuxtLink>
            </div>
            <NuxtLink class="dropdown-item" to="/r/new">{{ $t('navbar.new_recipe') }}</NuxtLink>
            <NuxtLink class="dropdown-item" :to="'/u/' + currentUser.slug">{{ $t('navbar.recipes') }}</NuxtLink>
            <NuxtLink class="dropdown-item" :to="'/u/' + currentUser.slug + '/following'">{{ $t('navbar.following') }}</NuxtLink>
            <NuxtLink class="dropdown-item" :to="'/u/' + currentUser.slug + '/settings'">{{ $t('navbar.settings') }}</NuxtLink>
            <div
              @click="logout"
              class="dropdown-item mouse-pointer"
            >{{ $t('navbar.logout') }}</div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="d-flex align-items-center"
      >
        <NuxtLink
          to="/login"
          class="btn btn-sm text-body mx-2 text-decoration-none"
        >{{ $t('navbar.login') }}</NuxtLink>
        <NuxtLink
          to="/signup"
          class="btn btn-sm btn-dark mx-2"
        >{{ $t('navbar.getStarted') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { isMobile } from 'mobile-device-detect'
// const FacebookLogin = () => import('../components/buttons/Facebook.vue')

export default {
  name: 'NavbarLarge',
  data () {
    return {
      componentKey: 0,
      loading: false,
      searchQuery: '',
    }
  },
  // components: {
  //   FacebookLogin,
  // },
  created () {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed () {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      authorization: 'users/sessions/authorization',
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
    }),
    // user () {
    //   return this.currentUser
    // },
    isScrollTop () {
      return true
    },
  },
  methods: {
    validSearchQuery () {
      // this.$refs.searchInput.value = ''
      console.log(this.searchQuery)
      this.$store.dispatch('SEARCH', { query: this.searchQuery })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$router.push({ name: 'Search', query: { r: this.searchQuery } })
            this.searchQuery = ''
          }
        })
    },
    async scroll2Top () {
      if (this.$route.path == '/') {
        const scroll = () => {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior: 'smooth'
          };
          window.scrollTo(scrollOptions)
        }
        const refresh = () => {
          this.$store
            .dispatch('recipes/list', {})
            .then(response => {
              // this.loading = false
            })
        }
        if (window.scrollY > 0) await scroll()
        await refresh()
        if (this.isAuthenticated) {
          this.$store
            .dispatch('REFRESH_ACCESS_TOKEN', {
              authorizationToken: this.authorization.authorizationToken,
              refreshToken: this.authorization.refreshToken,
              expireAt: this.authorization.expireAt
            })
        }
        // this.loading = true
      }
    },
    handleScroll (event) {
      // Code to be executed when the window is scrolled
      const position = window.scrollY > 0
      // console.log(position)
      if (position) this.$refs.navbar.classList.add('border-bottom')
      else this.$refs.navbar.classList.remove('border-bottom')
      return position
    },
    logout () {
      let message = this.$t('navbar.are_you_sure')

      let options = {
          // html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          // loader: false, // set to true if you want the dialog to show a loader after click on "proceed"
          // reverse: false, // switch the button positions (left to right, and vise versa)
          okText:  this.$t('navbar.logout'),
          cancelText: this.$t('navbar.cancel'),
          // animation: 'zoom', // Available: "zoom", "bounce", "fade"
          // type: 'basic', // coming soon: 'soft', 'hard'
          // verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
          // verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
          // clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
          backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
          customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      };

      this.$dialog
        .confirm(message, options)
        .then(dialog => {
          console.log('Clicked on proceed')
          // DELETE FACEBOOK COOKIES c_user xs
          this.$store.dispatch('users/sessions/logOut', {})
            .then(response => {
              console.log(response)
              if (response.status === 200 && this.$route.name != 'Home') this.$router.push({ name: 'Home' })
            })
        })
        .catch(() => {
          console.log('Clicked on cancel')
        });
    },
    forceRerender () {
      this.componentKey += 1;
    },
    navbarHeight () {
      this.$store.dispatch('navbarHeight', parseInt(this.$refs.navbar.offsetHeight))
    },
  },
  beforeMount () {
    this.forceRerender()
  },
  mounted () {
    this.navbarHeight()
    this.handleScroll()
  }
}
</script>
