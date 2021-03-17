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
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list'
    }),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
    }),
  },
  async fetch () {
    await this.getStoreData()
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
