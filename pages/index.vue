<template>
  <div>
    <Banner v-if="isAuthenticated == false" />
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
  // middleware: 'authenticated',
  async asyncData(context) {
    console.log(context)
    const storeData = await context.store.dispatch('getStoreData')
    console.log(storeData)
    const banner = await context.store.dispatch('banner/getBannerImage')
    console.log(banner)
    // const bannerImage = banner.data.bannerImage
    // return { bannerImage }
  },
  // async fetch () {
    // await this.getStoreData()
  // },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
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
  async created () {
    // if (this.items.length == 0) this.getStoreData()
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
