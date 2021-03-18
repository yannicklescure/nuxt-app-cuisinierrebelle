<template>
  <div>
    <Banner v-if="!isAuthenticated" />
    <Cards v-if="show" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      show: false,
      image: {
        id: null,
        link: {
          download: null,
        },
        url: null,
        user: {
          name: null,
          username: null
        }
      },
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
    }),
  },
  methods: {
    ...mapActions({
      // getBannerImage: 'banner/getBannerImage',
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list'
    }),
  },
  async created() {
    await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
  },
  mounted() {
    this.show = true
  }
}
</script>
