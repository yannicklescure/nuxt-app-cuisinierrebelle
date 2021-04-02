<template>
  <div
    class="container"
    :key="componentKey"
  >
    <div class="h1 mb-3">{{ $t('userSettings.title') }}</div>
    <div class="mb-3">
      <img :src="currentUser.image.preview.url" height="96" width="96" class="rounded img-fluid" :alt="currentUser.slug">
    </div>
    <div class="d-flex flex-column mb-3">
      <NuxtLink :to="`/u/${ currentUser.slug }/photo`">{{ $t('users.settings.photo.title') }}</NuxtLink>
      <NuxtLink :to="`/u/${ currentUser.slug }/delete`">{{ $t('userSettings.deleteAccount') }}</NuxtLink>
    </div>
    <div class="mb-3">
      <UsersNotifications />
    </div>
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
      // navbarHeight: 0,
    }
  },
  // components: {
    // UserNotifications,
  // },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
    }),
  },
  // methods: {
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
  // },
  // beforeMount () {
  //   if (this.$route.params.slug === this.currentUser.slug) this.show = true
  //   else {
  //     console.log('ALERT')
  //     this.$router.push({
  //       path: '/'
  //     })
  //   }
  // },
  // mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  // }
}
</script>
