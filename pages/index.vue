<template>
  <div>
    <Banner v-if="isAuthenticated == false" :bannerImage="bannerImage" />
    <LazyCards v-if="show" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      show: false,
    }
  },
  async asyncData(context) {
    await context.store.dispatch('getStoreData')
    const bannerData = await context.$axios.$get('https://api.cuisinierrebelle.com/v1/unsplash_images')
    const bannerImage = bannerData.data.bannerImage
    return { bannerImage }
  },
  // middleware: 'authenticated',
  // asyncData(context) {
  //   console.log(context)
  //   context.store.dispatch('getStoreData')
  //   context.store.dispatch('banner/getBannerImage')
  // },
  methods: {
    ...mapActions({
      // getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list'
    }),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      // getItems: 'recipes/listSorted',
    }),
    // items () {
    //   return this.isAuthenticated ? this.getItems : this.getItems.slice(0, 24)
    // }
  },
  async fetch () {
    // await this.getStoreData()
    if (this.isAuthenticated) this.fetchNotifications()
  },
  mounted () {
    this.$nextTick(() => {
      this.show = true
      // if (this.isAuthenticated) this.show = true
      // else setTimeout(() => {
      //   this.show = true
      // }, 1000)
    })
  }
}
</script>
