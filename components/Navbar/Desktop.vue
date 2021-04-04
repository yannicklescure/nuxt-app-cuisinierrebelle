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
    <div class="form-group  d-flex flex-grow-1 mx-5">
      <input
        ref="searchInput"
        v-model="query"
        type="search"
        class="form-control"
        :placeholder="$t('navbar.search')"
        @keyup.enter="searchQuery"
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
        <NuxtLink
          v-if="notifications.length > 0"
          to="/notifications"
          class="nav-item text-body text-decoration-none"
          @click.native="getNotifications"
        >
          <i class="material-icons md-18 d-flex">{{ icons.notifications }}</i>
        </NuxtLink>
        <b-dropdown
          ref="dropdown"
          variant="link"
          toggle-class="text-decoration-none text-body"
          no-caret
        >
          <template #button-content>
            <i class="material-icons md-18 d-flex">more_vert</i>
          </template>
          <NuxtLink
            :to="`/u/${ currentUser.slug }`"
            class="dropdown-item"
            @click.native="dropdownClick"
          >
            {{ $t('navbar.recipes') }}
          </NuxtLink>
          <NuxtLink
            :to="`/u/${ currentUser.slug }/following`"
            class="dropdown-item"
            @click.native="getUsers"
          >
            {{ $t('navbar.following') }}
          </NuxtLink>
          <NuxtLink
            to="/r/new"
            class="dropdown-item"
            @click.native="dropdownClick"
          >
            {{ $t('navbar.new_recipe') }}
          </NuxtLink>
          <NuxtLink
            :to="`/u/${ currentUser.slug }/settings`"
            class="dropdown-item"
            @click.native="dropdownClick"
          >
            {{ $t('navbar.settings') }}
          </NuxtLink>
          <div
            class="dropdown-item mouse-pointer"
            @click="logout"
          >
            {{ $t('navbar.logout') }}
          </div>
          <div
            v-if="currentUser.admin"
            class="border-top pt-2 mt-2"
          >
            <NuxtLink
              :to="'/admin'"
              class="dropdown-item"
              @click.native="dropdownClick"
            >
              {{ $t('navbar.admin') }}
            </NuxtLink>
          </div>
        </b-dropdown>
      </div>
      <div
        v-else
        class="d-flex align-items-center"
      >
        <NuxtLink
          to="/login"
          class="btn btn-sm text-body text-decoration-none mx-2"
        >
          {{ $t('navbar.login') }}
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="btn btn-sm btn-info mx-2"
        >
          {{ $t('navbar.getStarted') }}
        </NuxtLink>
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
      query: '',
      icons: {
        bookmarks: 'bookmark',
        notifications: 'notifications_none'
      }
    }
  },
  async fetch () {
    if (this.isAuthenticated) {
      await this.refreshAccessToken()
      this.fetchNotifications()
    }
  },
  computed: {
    ...mapGetters({
      bookmarks: 'users/sessions/bookmarks',
      currentUser: 'users/sessions/current',
      isAuthenticated: 'users/authentication/isAuthenticated',
      notifications: 'notifications/listSorted'
    }),
    isScrollTop () {
      return true
    }
  },
  watch: {
    notifications (oldValue, newValue) {
      if (oldValue.length !== newValue.length) {
        this.icons.notifications = 'notifications'
      }
    }
  },
  mounted () {
    this.navbarHeight()
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/list',
      fetchRecipes: 'recipes/list',
      refreshAccessToken: 'users/sessions/refreshAccessToken'
    }),
    dropdownClick () {
      this.$refs.dropdown.hide(true)
    },
    getUsers () {
      this.$refs.dropdown.hide(true)
    },
    getNotifications () {
      this.icons.notifications = 'notifications_none'
    },
    async searchQuery () {
      if (this.query.length > 0) {
        await this.$store.dispatch('search/query', { query: this.query })
        this.$router.push({ path: '/search', query: { r: this.query } })
        this.query = ''
      }
    },
    async scroll2Top () {
      if (this.$route.path === '/') {
        const scroll = () => {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior: 'smooth'
          }
          window.scrollTo(scrollOptions)
        }
        if (window.scrollY > 0) {
          await scroll()
        }
      } else {
        this.$router.push({ path: '/' })
      }
    },
    handleScroll (event) {
      // Code to be executed when the window is scrolled
      const position = window.scrollY > 0
      // console.log(position)
      if (position) {
        this.$refs.navbar.classList.add('border-bottom')
      } else {
        this.$refs.navbar.classList.remove('border-bottom')
      }
      return position
    },
    logout () {
      const message = this.$t('navbar.are_you_sure')

      const options = {
        okText: this.$t('navbar.logout'),
        cancelText: this.$t('navbar.cancel'),
        backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      }

      this.$dialog
        .confirm(message, options)
        .then(async (dialog) => {
          // console.log('Clicked on proceed')
          // DELETE FACEBOOK COOKIES c_user xs
          await this.$store.dispatch('users/sessions/logOut', {})
          if (this.$route.path !== '/') {
            this.$router.push({ path: '/' })
          }
        })
        .catch(() => {
          // console.log('Clicked on cancel')
        })
    },
    navbarHeight () {
      this.$store.dispatch('navbarHeight', parseInt(this.$refs.navbar.offsetHeight))
    }
  }
}
</script>
