<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <Cards v-else-if="recipes.length > 0" :recipes="recipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Bookmarks',
  middleware: 'authenticated',
  // nuxtI18n: {
  //   paths: {
  //     fr: '/favoris', // -> accessible at /favoris
  //     en: '/bookmarks', // -> accessible at /en/bookmarks
  //   }
  // },
  methods: {
    ...mapActions(['getStoreData']),
  },
  computed: {
    ...mapGetters({
      recipes: 'users/sessions/bookmarks',
      timestamp: 'timestamp',
    }),
  },
  async fetch () {
    let refresh = true
    if (this.timestamp != null) refresh = new Date().getTime() - this.timestamp > 60*1000*3
    if (refresh) await this.getStoreData()
  },
}
</script>
