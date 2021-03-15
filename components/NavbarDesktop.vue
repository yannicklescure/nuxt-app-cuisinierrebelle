<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="['d-print-none navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white mb-3']"
    >
    <div class="d-flex align-items-center">
      <div
        class="navbar-brand d-flex align-items-center text-body mouse-pointer"
        @click="scroll2Top"
      >
        <img :src="'https://media.cuisinierrebelle.com/brand-icon.jpg'" width="32" height="32" class="mr-1">
        <span>{{ $t('navbar.brand') }}</span>
      </div>
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
        <NuxtLink to="/top100" class="nav-item text-fire text-decoration-none">
          <i class="material-icons md-18 d-flex">whatshot</i>
        </NuxtLink>
        <NuxtLink v-if="bookmarks.length > 0" to="/bookmarks" class="nav-item text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">{{ icons.bookmarks }}</i>
        </NuxtLink>
        <NuxtLink v-if="notifications.length > 0" to="/notifications" @click.native="getNotifications" class="nav-item text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">{{ icons.notifications }}</i>
        </NuxtLink>
        <b-dropdown variant="link" ref="dropdown" toggle-class="text-decoration-none text-body" no-caret>
          <template #button-content>
            <i class="material-icons md-18 d-flex">more_vert</i>
          </template>
          <div class="border-bottom pb-2 mb-2" v-if="currentUser.admin">
            <NuxtLink class="dropdown-item" @click.native="dropdownClick" :to="'/admin'">{{ $t('navbar.admin') }}</NuxtLink>
          </div>
          <NuxtLink class="dropdown-item" @click.native="dropdownClick" to="/r/new">{{ $t('navbar.new_recipe') }}</NuxtLink>
          <NuxtLink class="dropdown-item" @click.native="dropdownClick" :to="`/u/${ currentUser.slug }`">{{ $t('navbar.recipes') }}</NuxtLink>
          <NuxtLink class="dropdown-item" @click.native="getUsers" :to="`/u/${ currentUser.slug }/following`">{{ $t('navbar.following') }}</NuxtLink>
          <NuxtLink class="dropdown-item" @click.native="dropdownClick" :to="`/u/${ currentUser.slug }/settings`">{{ $t('navbar.settings') }}</NuxtLink>
          <div
            @click="logout"
            class="dropdown-item mouse-pointer"
          >{{ $t('navbar.logout') }}</div>
        </b-dropdown>
      </div>
      <div
        v-else
        class="d-flex align-items-center"
      >
        <NuxtLink
          to="/login"
          class="btn btn-sm text-body text-decoration-none mx-2"
        >{{ $t('navbar.login') }}</NuxtLink>
        <NuxtLink
          to="/signup"
          class="btn btn-sm btn-info mx-2"
        >{{ $t('navbar.getStarted') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavbarLarge',
  data () {
    return {
      componentKey: 0,
      loading: false,
      searchQuery: '',
      icons: {
        bookmarks: 'bookmark',
        notifications: 'notifications_none'
      }
    }
  },
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
      authorization: 'users/sessions/authorization',
      bookmarks: 'users/sessions/bookmarks',
      currentUser: 'users/sessions/current',
      isAuthenticated: 'users/authentication/isAuthenticated',
      isMobile: 'isMobile',
      notifications: 'notifications/listSorted',
    }),
    // user () {
    //   return this.currentUser
    // },
    isScrollTop () {
      return true
    },
  },
  watch: {
    notifications (oldValue, newValue) {
      if (oldValue.length != newValue.length) {
        // console.log(oldValue)
        // console.log(newValue)
        this.icons.notifications = 'notifications'
      }
    },
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/list',
      fetchRecipes: 'recipes/list',
      refreshAccessToken: 'users/sessions/refreshAccessToken',
    }),
    dropdownClick () {
      console.log('click')
      this.$refs.dropdown.hide(true)
    },
    getUsers () {
      this.$refs.dropdown.hide(true)
      // this.$store
      //   .dispatch('users/getUsers', {})
      //   .then(response => {
      //     console.log(response)
      //   })
    },
    getNotifications () {
      console.log('getNotifications')
      this.icons.notifications = 'notifications_none'
      this.fetchNotifications()
    },
    validSearchQuery () {
      // this.$refs.searchInput.value = ''
      console.log(this.searchQuery)
      this.$store.dispatch('search/query', { query: this.searchQuery })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$router.push({ path: '/search', query: { r: this.searchQuery } })
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
        if (window.scrollY > 0) await scroll()
        await this.fetchRecipes()
        if (this.isAuthenticated) {
          this.fetchNotifications()
          this.refreshAccessToken()
        }
        // this.loading = true
      }
      else {
        this.$router.push({ path: '/' })
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
              // console.log(response)
              if (response.status === 200 && this.$route.path != '/') this.$router.push({ path: '/' })
            })
        })
        .catch(() => {
          // console.log('Clicked on cancel')
        });
    },
    navbarHeight () {
      this.$store.dispatch('navbarHeight', parseInt(this.$refs.navbar.offsetHeight))
    },
  },
  mounted () {
    this.navbarHeight()
    this.handleScroll()
  }
}
</script>
