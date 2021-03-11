<template>
  <div
    class="container"
    :key="componentKey"
    v-if="show"
  >
    <h1>{{ $t('userSettings.title') }}</h1>
    <div class="mb-3">
      <UsersNotifications />
    </div>
    <NuxtLink :to="`/u/${ currentUser.slug }/delete/`">{{ $t('userSettings.deleteAccount') }}</NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// const UserNotifications = () => import('../components/UserNotifications.vue')

export default {
  name: 'UserSettings',
  // middleware: 'authenticated',
  middleware: ['authenticated', 'authorization'],
  data () {
    return {
      componentKey: 0,
      show: false,
      // navbarHeight: 0,
    }
  },
  // components: {
    // UserNotifications,
  // },
  methods: {
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
    }),
  },
  beforeMount () {
    if (this.$route.params.slug === this.currentUser.slug) this.show = true
    else {
      console.log('ALERT')
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
