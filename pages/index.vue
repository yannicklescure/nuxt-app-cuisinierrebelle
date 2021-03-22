<template>
  <div>
    <Banner v-if="!isAuthenticated" />
    <Cards v-if="recipes.length > 0" :recipes="recipes" />
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
    }),
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list'
    }),
  },
  async fetch() {
    await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
  },
  mounted() {
    this.show = true
  }
}
</script>
