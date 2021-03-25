<template>
  <div>
    <div v-if="$fetchState.pending">{{ $t('init.loading') }}</div>
    <div v-else-if="$fetchState.error">
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
    }),
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list'
    }),
  },
  async fetch() {
    if (this.recipes.length == 0) await this.getStoreData()
    if (this.isAuthenticated) await this.fetchNotifications()
  },
  mounted() {
    this.show = true
  }
}
</script>
