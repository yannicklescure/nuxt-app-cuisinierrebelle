<template>
  <div>
    <Banner v-if="isAuthenticated == false" :image="image" />
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
    const response = await this.$axios.$get('https://api.cuisinierrebelle.com/v1/unsplash_images')
    this.image = response.data.bannerImage
    await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
  },
  mounted() {
    this.show = true
  }
}
</script>
