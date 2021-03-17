<template>
  <div>
    <Banner v-if="isAuthenticated == false" />
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
  async fetch () {
    await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
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
