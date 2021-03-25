<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <Banner v-if="!isAuthenticated" />
      <Cards v-if="recipes.length > 0" :recipes="recipes" />
    </div>
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
      recipes: 'recipes/listSorted',
      timestamp: 'timestamp',
    }),
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list',
      refreshAccessToken: 'users/sessions/refreshAccessToken',
    }),
  },
  async fetch() {
    if (this.isAuthenticated) {
      await this.refreshAccessToken()
      this.fetchNotifications()
    }
    let refresh = true
    if (this.timestamp != null) refresh = new Date().getTime() - this.timestamp > 60*1000*3
    if (refresh) await this.getStoreData()
  },
  mounted() {
    this.show = true
  }
}
</script>
