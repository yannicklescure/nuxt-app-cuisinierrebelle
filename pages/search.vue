<template>
  <div>
    <Cards v-if="recipes.length > 0" :recipes="recipes" />
    <div v-else class="container">
      <div class="py-3" v-html="$t('search.noResult', { query: $route.query.r })"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Search',
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      recipes: 'search/result',
    }),
  },
}
</script>
