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
  async created() {
    await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
  },
  mounted() {
    this.show = true
  }
}
</script>
