<template>
  <div>
    <Banner v-if="isAuthenticated == false" />
    <LazyCards />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  // data() {
  //   return {
  //     // items: [],
  //     // fetchedData: null
  //   }
  // },
  // middleware: 'authenticated',
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
}
</script>
